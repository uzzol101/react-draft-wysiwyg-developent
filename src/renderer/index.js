import React from 'react'
import Embedded from './Embedded';
import ImageComponent from '../renderer/Image';


let allConfig;

const Media = (props) => {
  const entity = props.contentState.getEntity(
    props.block.getEntityAt(0)
  );

  const type = entity.getType();

  let media;
  if (type === 'EMBEDDED_LINK') {
    media = <Embedded {...props}  />;
  } else if (type === 'IMAGE') {
    media = <ImageComponent {...props} config={allConfig} />;
  }

  return media;
};

function mediaBlockRenderer(block) {
 if (block.getType() === 'atomic') {
   return {
     component: Media,
     editable: false,
   };
 }

 return '';
}


const getBlockRenderFunc = (config, customBlockRenderer) => (block) => {
  
  allConfig = config

  if (typeof customBlockRenderer === 'function') {
    const renderedComponent = customBlockRenderer(block, config, config.getEditorState);
    if (renderedComponent) return renderedComponent;
  }

  return mediaBlockRenderer(block)
};

export default getBlockRenderFunc;
