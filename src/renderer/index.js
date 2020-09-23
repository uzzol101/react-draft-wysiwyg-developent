import React from 'react'
import Embedded from './Embedded';
import getImageComponent from '../renderer/Image';









const Audio = (props) => {
  return <audio controls src={props.src} />;
};

const Image = (props) => {
  return <img src={props.src} />;
};

const Video = (props) => {
  return <video controls src={props.src} />;
};

const Media = (props) => {
  console.log('here is props ', props)
  const entity = props.contentState.getEntity(
    props.block.getEntityAt(0)
  );
  const {src} = entity.getData();
  const type = entity.getType();

  let media;
  if (type === 'audio') {
    media = <Audio src={src} />;
  } else if (type === 'IMAGE') {
    media = <Image src={src} />;
  } else if (type === 'video') {
    media = <Video src={src} />;
  }

  return media;
};

function mediaBlockRenderer(block) {
 if (block.getType() === 'atomic') {
   console.log('atomic block')
   return {
     component: Media,
     editable: false,
   };
 }

 return '';
}


const getBlockRenderFunc = (config, customBlockRenderer) => (block) => {
  // if (typeof customBlockRenderer === 'function') {
  //   const renderedComponent = customBlockRenderer(block, config, config.getEditorState);
  //   if (renderedComponent) return renderedComponent;
  // }
  // if (block.getType() === 'atomic') {
  //   const contentState = config.getEditorState().getCurrentContent();
  //   // console.log('content state ', contentState)
  //   console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  //   console.log('block in image type', block.getType())
  //   console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  //   // console.log('block EntityAt', block.getEntityAt(0))

  //   const entity = contentState.getEntity(block.getEntityAt(0));
  //   // console.log('entity ', entity)
  //   if (entity && entity.type === 'IMAGE') {
  //     return {
  //       component: getImageComponent(config),
  //       editable: false,
  //     };
  //   } else if (entity && entity.type === 'EMBEDDED_LINK') {
  //     return {
  //       component: Embedded,
  //       editable: false,
  //     };
  //   }
  // }
  // return undefined;


  return mediaBlockRenderer(block)
};

export default getBlockRenderFunc;
