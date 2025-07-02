import { EuiBasicTable, EuiBasicTableColumn, EuiButton, EuiButtonEmpty, EuiConfirmModal, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiFlyout, EuiFlyoutBody, EuiFlyoutFooter, EuiFlyoutHeader, EuiIcon, EuiPopover, EuiText, EuiTitle, useGeneratedHtmlId, EuiGlobalToastList, EuiGlobalToastListToast  } from "@elastic/eui";

import React, { useState } from "react";

interface Task{
  id: number;
  tasks: string;
}
const LandingPage:React.FC = ()=>{
  const [openPopOverId, setOpenPopoverId] = useState<number | null>(null);
  //flyout
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [editFlyout, setEditFlyout] = useState<Task | null>(null);
  const [editTask, setEditTask] = useState('');

  //for delete modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState<Task | null>(null);


  //for delete toast
  const [toasts, setToasts] = useState<EuiGlobalToastListToast[]>([]);
  


  //FOR MODAL
  const closeModal = () => setIsModalVisible(false);
  const showModal = (item: Task) =>{
    setIsModalVisible(true);
    setDeleteModal(item); //set taask to delete
  }; 
  const modalTitleId = useGeneratedHtmlId();

  //for toast
  const addDeleteToast = () => {
    setToasts ([...toasts,
      {
        id: String(Date.now()),
        title: 'Task deleted',
        color: "danger",
        iconType:"trash",
      }
    ]);
  };  
    

  //for table data
   const [tasks, setTasks] = useState<Task[]> ([
    { 
      id: 1, tasks: "learn coding"
    },
    {
      id: 2, tasks: "learn how to code"
    },
    {
      id: 3, tasks: "have lunch"
    },
    {
      id: 4, tasks: "hang out with friends"
    },
    {
       id: 5, tasks: "back home"
    }, 
  ]);
  const columns: Array<EuiBasicTableColumn<Task>> = [
     {
      field: "id",
      name: "ID",
      render: (id: number)=> <>{id}</>
    },
    {
      field: "tasks", 
      name: "Task", 
      render: (task: string)=> <>{task}</>
    },
    {
      name: "Action",
      render:(item: Task)=> {
        const isOpen = openPopOverId === item.id;
        const  closePopover = () => setOpenPopoverId(null);
        const togglePopover = () => setOpenPopoverId(isOpen ? null : item.id);
        return(
          <EuiPopover
          button = {
            <EuiIcon type="boxesHorizontal"
            onClick={togglePopover}/>
          }
          isOpen = {isOpen}
          closePopover={closePopover}>

            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiButtonEmpty onClick={()=>{
                  setEditTask(item.tasks); //store editable value
                  setEditFlyout(item); //set task to edit
                  setIsFlyoutVisible(true); // show flyout
                  setOpenPopoverId(null); // CLOSE popover 
                }} iconType="pencil">Edit</EuiButtonEmpty>
              {/* </EuiFlexItem>

              <EuiFlexItem> */}
                <EuiButtonEmpty iconType="trash" color="danger"  
                onClick={()=>{
                  showModal(item);
                  setIsModalVisible(true);
                  
                  
                }}
                >Delete</EuiButtonEmpty>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPopover>  
        )
      } 
    },
  ] 

  //flyout handle for edit
  const simpleFlyoutTitleId = useGeneratedHtmlId();
  let flyout = (
    <EuiFlyout
      ownFocus
      size="s" // Options: 's', 'm', 'l', 'xl'
      onClose={()=>setIsFlyoutVisible(false)}
      aria-labelledby={simpleFlyoutTitleId}    
    >
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h3 id = {simpleFlyoutTitleId}>Edit</h3>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiText>Task:</EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFieldText value={editTask} placeholder="enter task"
            onChange={(e)=> (setEditTask(e.target.value))} //update value as user types
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlyoutBody>

      <EuiFlyoutFooter>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiButton color="warning" onClick={()=>{
              setIsFlyoutVisible(false);
              setEditFlyout(null);
              setEditTask("");
            }}>Close</EuiButton>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiButton color="success" onClick={()=>{
              if(editFlyout){
                const updatedTask = tasks.map((task)=> task.id===editFlyout.id ? {...task, tasks:editTask} : task);
                setTasks(updatedTask); //update table data
                setIsFlyoutVisible(false); // close flyout
                setEditFlyout(null); //reset edit state
                setEditTask(""); // clear input
              }
              }
             }>Update</EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlyoutFooter>
    </EuiFlyout>
  )

  return(
    <div>
      <div className="profile-container">
          <p>welcome shikha kandel</p>
      </div>

      <div className="task-container">
        <h5>Task LisT</h5>
        <img className="image-icon" src="https://img.icons8.com/?size=100&id=1501&format=png&color=309040" alt="" height={25} width={25}/> 
        <EuiBasicTable
         items={tasks}
         columns={columns}
         rowHeader="task"
        />        
      </div>
      {isFlyoutVisible && flyout}

      {isModalVisible && (
        <EuiConfirmModal 
          aria-labelledby={modalTitleId}
          title = "Delete task"
          titleProps={{id: modalTitleId}}
          onCancel={()=>{
           closeModal();     
            setDeleteModal(null);     
          }}
          onConfirm={()=>{
            if(deleteModal){
              const updatedTasks = tasks.filter(task=>task.id!==deleteModal.id);
              setTasks(updatedTasks);
              setDeleteModal(null);
              addDeleteToast(); //Show toast after deletion
              }
            setIsModalVisible(false)
          }}
          cancelButtonText = "Cancel"
          confirmButtonText= "Delete"
          buttonColor="danger"
        >
          <p>Are you sure you want to permanently delete this task?</p>
        </EuiConfirmModal>   
      )}

      <EuiGlobalToastList
        toasts={toasts}
          dismissToast={(removedToast) => setToasts(toasts.filter((t) => t.id !== removedToast.id))}
        toastLifeTimeMs={6000}
          />


    </div>       
  )
}
export default LandingPage;