/* FNF OGG Lab — independent Ogg/Vorbis integrity checks.
   This does not decode or re-encode audio. It validates Ogg page CRCs,
   page sequencing, and Vorbis stream layout before accepting an optimization. */
(()=>{
"use strict";
const crcTable=new Uint32Array(256);
for(let i=0;i<256;i++){
  let c=(i<<24)>>>0;
  for(let b=0;b<8;b++)c=((c&0x80000000)?((c<<1)^0x04C11DB7):(c<<1))>>>0;
  crcTable[i]=c;
}
function oggCrc(bytes,start,end){
  let crc=0;
  for(let i=start;i<end;i++){
    const value=(i>=start+22&&i<start+26)?0:bytes[i];
    crc=((crc<<8)^crcTable[((crc>>>24)^value)&255])>>>0;
  }
  return crc>>>0;
}
function readU64(view,offset){
  if(typeof view.getBigUint64==="function")return view.getBigUint64(offset,true);
  return BigInt(view.getUint32(offset,true))|(BigInt(view.getUint32(offset+4,true))<<32n);
}
function inspect(buffer){
  const bytes=new Uint8Array(buffer),view=new DataView(buffer),streams=new Map();
  let offset=0,pages=0;
  while(offset<bytes.length){
    if(offset+27>bytes.length||bytes[offset]!==79||bytes[offset+1]!==103||bytes[offset+2]!==103||bytes[offset+3]!==83)
      throw new Error("Estructura OGG incompleta o inválida.");
    if(bytes[offset+4]!==0)throw new Error("Versión de página OGG no compatible.");
    const segments=bytes[offset+26],tableStart=offset+27,bodyStart=tableStart+segments;
    if(bodyStart>bytes.length)throw new Error("Tabla de segmentos OGG incompleta.");
    let bodyLength=0;
    for(let i=0;i<segments;i++)bodyLength+=bytes[tableStart+i];
    const pageEnd=bodyStart+bodyLength;
    if(pageEnd>bytes.length)throw new Error("Página OGG truncada.");
    const expected=view.getUint32(offset+22,true),actual=oggCrc(bytes,offset,pageEnd);
    if(expected!==actual)throw new Error("La comprobación CRC de una página OGG no coincide.");
    const serial=view.getUint32(offset+14,true),sequence=view.getUint32(offset+18,true);
    let stream=streams.get(serial);
    if(!stream){
      stream={serial,expectedSequence:0,packetParts:[],firstPacketChecked:false,channels:null,sampleRate:null,pages:0};
      streams.set(serial,stream);
    }
    if(sequence!==stream.expectedSequence)throw new Error("La secuencia de páginas OGG está incompleta.");
    stream.expectedSequence=(sequence+1)>>>0;stream.pages++;pages++;
    let body=bodyStart;
    for(let i=0;i<segments;i++){
      const length=bytes[tableStart+i];
      if(!stream.firstPacketChecked&&length)stream.packetParts.push(bytes.slice(body,body+length));
      body+=length;
      if(length<255&&!stream.firstPacketChecked){
        let total=0;for(const part of stream.packetParts)total+=part.length;
        const packet=new Uint8Array(total);let at=0;
        for(const part of stream.packetParts){packet.set(part,at);at+=part.length;}
        stream.firstPacketChecked=true;stream.packetParts=[];
        const isVorbis=packet.length>=30&&packet[0]===1&&
          packet[1]===118&&packet[2]===111&&packet[3]===114&&packet[4]===98&&packet[5]===105&&packet[6]===115;
        if(isVorbis){
          const header=new DataView(packet.buffer,packet.byteOffset,packet.byteLength);
          stream.channels=packet[11];
          stream.sampleRate=header.getUint32(12,true);
          if(!stream.channels||!stream.sampleRate)throw new Error("Cabecera Vorbis inválida.");
        }
      }
    }
    offset=pageEnd;
  }
  if(!pages||!streams.size)throw new Error("El archivo no contiene páginas OGG.");
  const layouts=[...streams.values()].map(s=>{
    if(!s.firstPacketChecked||s.channels===null)throw new Error("No se encontró una cabecera Vorbis válida.");
    return {channels:s.channels,sampleRate:s.sampleRate};
  }).sort((a,b)=>a.sampleRate-b.sampleRate||a.channels-b.channels);
  return {pages,streamCount:streams.size,layouts};
}
async function compare(originalBlob,candidateBlob){
  const [originalBuffer,candidateBuffer]=await Promise.all([originalBlob.arrayBuffer(),candidateBlob.arrayBuffer()]);
  const original=inspect(originalBuffer),candidate=inspect(candidateBuffer);
  if(original.streamCount!==candidate.streamCount)throw new Error("Cambió la cantidad de pistas OGG.");
  if(original.layouts.length!==candidate.layouts.length)throw new Error("Cambió la distribución de pistas Vorbis.");
  for(let i=0;i<original.layouts.length;i++){
    const a=original.layouts[i],b=candidate.layouts[i];
    if(a.channels!==b.channels||a.sampleRate!==b.sampleRate)
      throw new Error("Cambió la configuración de canales o frecuencia de una pista.");
  }
  return {valid:true,pages:candidate.pages,streams:candidate.streamCount,layouts:candidate.layouts};
}
window.FNFOggValidator=Object.freeze({inspect,compare});
})();