interface ITask {
     _id: string;
     title: string;
     description: string;
     status: 'DONE' | 'PENDING';
     createdAt: Date;
     updateAt: Date;
}

interface ITaskForm {
     task?: ITask;
     setOpenTaskForm: (o: boolean) => void;
}

interface ITaskCard {
     task: ITask;
}

interface ITaskFormDialog {
     openTaskForm: boolean; 
     setOpenTaskForm: (o:boolean) => void, 
     task?: ITask
}

interface IAuthProvider {
     children: React.ReactNode;
}
   
interface IAuthContext {
     isAuthenticated: boolean;
     handleSignup: (values: SignupType) => Promise<void>;
     handleSignin: (values: SigninType) => Promise<void>;
     handleLogout: () => void;
}

interface ITaskProvider {
     children: React.ReactNode;
}

interface ITaskContext {
     tasks: ITask[];
     handleFetchAllTasks: () => Promise<void>;
     handleCreateTask: (values: { title: string; description?: string; }) => Promise<void>;
     handleUpdateTask: ({id, values } : { id: string, values: { status: "PENDING" | "DONE"; description?: string; }}) => Promise<void>;
     handleDeleteTask: (id: string) => Promise<void>;
}