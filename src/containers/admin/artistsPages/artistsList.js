import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Table, { TBody, Td, Th, THead, Tr } from '../../../components/table/table'
import { orderArtist } from '../../../AxiosFunctions/Axiosfunctionality';

import loading from '../../../assets/loading.gif';
function ArtistsList(props) {

    const [characters,updateCharacters] = useState([])
    const [filterArtist,setFilterArtist] = useState([]);
    const handleOnDragEnd = (result) => {
      if(!result.destination) return;
      const items = Array.from(characters)
      const [reorderedItem] = items.splice(result.source.index,1)
      items.splice(result.destination.index,0,reorderedItem)
      updateCharacters(items)
    }
    const updateList = (payload)=>{
        let temp = [];
        if(props.artistUsers.length>0){
            props.artistUsers.forEach((item,key)=>{
                if(item.type === payload){
                    temp.push(item);
                }
                else if(payload === "allArtist"){
                    temp.push(item);
                }
            })
            setFilterArtist(temp);
        }
    }
    useEffect(()=>{
        if(props.artistUsers.length>0){
            setFilterArtist(props.artistUsers);
        }
        if(characters.length === 0){
            updateCharacters(props.artistUsers)
        }
    },[props.artistUsers])

    const onSubmitHandler = () => {
        
        for(let i = 0; i < characters.length; i++){
            characters[i].orderArtist = i
        };
        orderArtist(characters)
             
        props.reorderArtistHandler(characters)
    }

    return (
    <>
       <button className='mx-1 myBtn mb-3' type="text" onClick={()=>updateList("allArtist")}>ALL ARTISTS</button>
       <button className='mx-1 myBtn mb-3' type="text" onClick={()=>updateList("kidshannon")}>KIDSHANON ARTISTS</button>
    {props.holder?<div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"50vh"}}><img className="mb-3" alt="loading" src={loading} style={{width:"50px"}}/></div>:
        <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='charactersStuff'>
          {(provided)=>(
          <Table height="calc(100vh - 350px)" provided={provided}>
                <THead>
                    <Th minWidth="120">Name</Th>
                    <Th minWidth="120">Status</Th>
                    <Th width="110"></Th>
                </THead>
                <TBody>
                    {filterArtist.length>0 ?  props.search !== "" ? props.tempArtist.map((item,key)=>
                    (
                    <Tr key={key}>
                        <Td>{item.firstname}</Td>
                        <Td className={item.status ===1?"text-success":"text-danger"}>{item.status ===1?"Active":"Inactive"}</Td>
                        <Td className="d-flex">
                            <button onClick={()=>props.formChangeEvent(item)} className='mx-1 myBtn' type="text">EDIT</button>
                            {props.holder?<img className="mt-1" alt="loading" src={loading} style={{width:"30px"}}/>:<button className='mx-1 myBtn active' type="text" onClick={(e)=>{props.deleteArtistUser(e,item._id)}}>DELETE</button>}
                        </Td>
                    </Tr>
                    )):
                    filterArtist.map((item,key)=>
                    (
                        <Draggable key={item._id} draggableId={item._id} index={key}>
                        {(provided) => (
                            <Tr key={key} provided={provided}>
                                <Td>{item.firstname}</Td>
                                {/* <Td><p style={item.status ===1?{color:"green"}:{color:"red"}}>{item.status ===1?"Active":"Inactive"}</p> </Td> */}
                                <Td className={item.status ===1?"text-success":"text-danger"}>{item.status ===1?"Active":"Inactive"}</Td>
                                <Td className="d-flex">
                                    <button onClick={()=>props.formChangeEvent(item)} className='mx-1 myBtn' type="text">EDIT</button>
                                    {props.holder?<img className="mt-1" alt="loading" src={loading} style={{width:"30px"}}/>:<button className='mx-1 myBtn active' type="text" onClick={(e)=>{props.deleteArtistUser(e,item._id)}}>DELETE</button>}
                                </Td>
                            </Tr>
                    )}
                    </Draggable>
                      )):"" }
                    
                   
                </TBody>
                {provided.placeholder}
            </Table>
            )}
            </Droppable>
            </DragDropContext>
                        }
                    </>
  )
}

export default ArtistsList