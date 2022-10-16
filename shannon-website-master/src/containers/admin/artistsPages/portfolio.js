import React, { useEffect, useState } from 'react'
import { IMAGE_ROUTE,artistPortfolioOrder } from '../../../AxiosFunctions/Axiosfunctionality'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

function Portfolio(props) {

  const [characters,updateCharacters] = useState(props.selectedImages.mainImage)
  const [enabled,setEnabled] = useState(false)
  const [tempImages,setTempImages] = useState([]);
  const handleOnDragEnd = (result) => {
    if(!result.destination) return;
    const items = Array.from(characters)
    const [reorderedItem] = items.splice(result.source.index,1)
    items.splice(result.destination.index,0,reorderedItem)
    updateCharacters(items)
  }
  const filterImages = (filter)=>{
    let tempData = [];
    let checker = false;
    if(props.selectedImages){
      if(filter === "type2"){
      tempData = props.selectedImages.mainImage.filter((item,key)=>{

       for(var i=0;i<item.keywordID.length;i++){
          if(item.keywordID[i].type===2){
            checker = true;
          }
       }
       if(checker){
          return true;
       }
       else{
          return false;
       }
      })
      console.log(tempData)
      setTempImages(tempData)
    }
    else if(filter==="reset"){
      setTempImages(props.selectedImages.mainImage)
    }

    }
  }
  const enableHandler = () => {

    if(enabled){
      for(let i = 0; i < characters.length; i++){
        characters[i].orderPortfolio = i
      };
      
      artistPortfolioOrder({
        id:props.selectedArtist._id,
        images:characters
      }).then(res=>{
        console.log('ENABELED',res)      
      })
    }
    setEnabled(!enabled)
  }
  useEffect(() => {
    if(props.selectedImages){
      setTempImages(props.selectedImages)
      filterImages("reset")
    }
  }, [])
  if(enabled){
    return (
      <>
      <button className='mx-1 myBtn mb-3' onClick={enableHandler}>{enabled?"Submit":"Enable"}</button>
      <button className='mx-1 myBtn mb-3' onClick={()=>{filterImages("reset")}}>All Artist</button>
      <button className='mx-1 myBtn mb-3' onClick={()=>{filterImages("type2")}}>Kid Shanon</button>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='characters'>
            {(provided)=>(
              <div className='row m-0' {...provided.droppableProps} ref={provided.innerRef}>
                {
                Object.keys(props.selectedImages).length > 0 ?
                tempImages.map((item,key)=>(
                  item.status === 1?
                  <Draggable key={item._id} draggableId={item._id} index={key}>
                    {(provided) => (
                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className='col-12 col-md-12 col-sm-12 artistcard w-inline-block'>
                      <img alt='' src={item.path} className="image"/>
                    </div>
                    )}
                  </Draggable>
                  :""
                  ))
                  :""
                }
                {provided.placeholder}
              </div>
            )}
        </Droppable>
        </DragDropContext>
      </>
    )
  }

  return (
    <>
      <button className='mx-1 myBtn mb-3' onClick={enableHandler}>Enable</button>
      <button className='mx-1 myBtn mb-3' onClick={()=>{filterImages("reset")}}>All Artist</button>
      <button className='mx-1 myBtn mb-3' onClick={()=>{filterImages("type2")}}>Kid Shanon</button>
      <div className='row m-0'>
        {
        tempImages.length > 0 ? tempImages.map((item,key)=>(
          item.status === 1?<div key={key} className='col-6 col-md-3 col-sm-4 artistcard w-inline-block'>
              <img alt='' src={item.path} className="image"/>
          </div>:""
        )):""
      }
      </div>
    </>
  )
}

export default Portfolio