import { Criteria, EuiBasicTable, EuiBasicTableColumn, EuiButton, EuiButtonEmpty, EuiConfirmModal, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiFlyout, EuiFlyoutBody, EuiFlyoutFooter, EuiFlyoutHeader, EuiIcon, EuiPopover, EuiText, EuiTitle, useGeneratedHtmlId, EuiGlobalToastList, EuiGlobalToastListToast, EuiFieldSearch  } from "@elastic/eui";

import React, { useState } from "react";

interface Task{
  id: number;
  tasks: string;
}
const LandingPage:React.FC = ()=>{

  //search hook
  const [searchTerm, setSearchTerm] = useState("")//for search
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("") //search using debouncing  
  //popover hooks edit delete
  const [openPopOverId, setOpenPopoverId] = useState<number | null>(null);
  //flyout hooks
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [editFlyout, setEditFlyout] = useState<Task | null>(null);
  const [editTask, setEditTask] = useState('');
  //add hooks
  const [addTask, setAddTask] = useState(false);
  

  //delete modal hooks
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState<Task | null>(null);

  
  //delete toast hooks
  const [toasts, setToasts] = useState<EuiGlobalToastListToast[]>([]);
  
  // pagination hooks
  const [pageIndex, setPageIndex] = useState(0); //current page (0-based)
  const [pageSize, setPageSize] = useState(4); //number of items per page 
  
  //FOR MODAL
  const closeModal = () => setIsModalVisible(false);
  const showModal = (item: Task) =>{
    setIsModalVisible(true);
    setDeleteModal(item); //set taask to delete
  }; 
  const modalTitleId = useGeneratedHtmlId();


  //validation functionality
  const addValidationToast = () =>{
    setToasts([
      ...toasts,
      {
        id: String(Date.now()),
        title: "Task field cannot be empty",
        color: "warning",
        iconType: "alert",
      },
    ]);
  };

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

   //debouncing 
  React.useEffect(()=>{
    const timerId = setTimeout(()=>{
      setDebouncedSearchTerm(searchTerm);
      setPageIndex(0); //reset tofirst page on new search
    }, 500);
    return()=>{
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  //add filtered task based on searchTerm
  const filteredTasks = tasks.filter((task)=>
    task.tasks.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );    
  
  // pagination  functionality
  const onTableChange = ({page}: Criteria<Task>)=>{
    if(page){
      const {index, size} = page;
      setPageIndex(index);
      setPageSize(size);      
    }
  };
  
  const startIndex= pageIndex * pageSize;
  let pageOfItems = filteredTasks.slice(
    startIndex,
    Math.min (startIndex + pageSize,filteredTasks.length)
  );

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount: filteredTasks.length,
    pageSizeOptions: [4,8, 16],
    hidePerPageOptions: false,    
  }

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
              if(!editTask.trim()){
                addValidationToast(); //show toast if input is empty or whitespace 
                return; //prevent add 
              }
              if(addTask){                
                //add new task
                const newTask: Task= {
                  id: tasks.length > 0 ? Math.max(...tasks.map((t)=>t.id)) + 1:1, //first task start with id: 1 and new tasks get id = last id + 1
                  tasks: editTask, 
                };
                setTasks([...tasks, newTask]);

              }else {
                //update existing task
                const updatedTask = tasks.map((task)=> task.id===editFlyout?.id ? {...task, tasks:editTask} : task);
                setTasks(updatedTask); //update table data
                }
                setIsFlyoutVisible(false); // close flyout
                setEditFlyout(null); //reset edit state
                setEditTask(""); // clear input
                setAddTask(false);
              }}
              >{addTask ? "Add Task" : "Update"}</EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlyoutFooter>
    </EuiFlyout>
  )

  return(
    <>
      

      <div className="task-container">
       <p style={{fontWeight: 600, fontSize: "20px", marginBottom: "10px"}}>Task List</p>       
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFieldSearch className="search-bar" onChange={(e)=> setSearchTerm(e.target.value)}isClearable placeholder="search task....."></EuiFieldSearch>
          </EuiFlexItem>
          <EuiFlexItem grow = {false}>
            <EuiButton className="add-button" color="accentSecondary" onClick={()=>{
              setEditTask(""); //clear task input
              setAddTask(true);  //add operation
              setIsFlyoutVisible(true) //open flyout
            }} >Add</EuiButton>
          </EuiFlexItem>
         </EuiFlexGroup>

        <EuiBasicTable className="table-details"
         items={pageOfItems}
         columns={columns}
         pagination={pagination}
         onChange={onTableChange}
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
    </>    
  )
}
export default LandingPage;