/**
 * AIEngineCoordinator.ts
 *
 * Orchestration layer of Universal AI Operating Companion.
 *
 * Responsibilities:
 * - Coordinate AI tasks
 * - Route requests
 * - Synchronize modules
 * - Manage execution flow
 */


// ==============================
// Core Types
// ==============================


export type CoordinationStatus =
    | "IDLE"
    | "PLANNING"
    | "EXECUTING"
    | "COMPLETED"
    | "FAILED"
    | "CANCELLED";



export type TaskPriority =
    | "LOW"
    | "NORMAL"
    | "HIGH"
    | "CRITICAL";



// ==============================
// Coordination Request
// ==============================


export interface ICoordinationRequest {


    id:
        string;


    task:
        string;


    taskType:
        string;


    source?:
        string;


    requiredCapabilities:
        string[];


    priority:
        TaskPriority;


    context?:
        Record<string, unknown>;


    permissions?:
        string[];


    sessionId?:
        string;


    timestamp:
        number;

}





// ==============================
// Coordination Response
// ==============================


export interface ICoordinationResponse {


    success:
        boolean;


    taskId:
        string;


    status:
        CoordinationStatus;


    results?:
        unknown;


    executionPath:
        string[];


    modulesUsed:
        string[];


    duration:
        number;


    error?:
        string;


    timestamp:
        number;

}





// ==============================
// Task Context
// ==============================


export interface ITaskContext {


    taskId:
        string;


    request:
        ICoordinationRequest;


    modules:
        string[];


    startedAt:
        number;


    metadata?:
        Record<string, unknown>;

}





// ==============================
// Module Communication
// ==============================


export interface IModuleCommunication {


    source:
        string;


    target:
        string;


    message:
        unknown;


    timestamp:
        number;

}





// ==============================
// Engine Event
// ==============================


export interface IEngineEvent {


    type:
        string;


    timestamp:
        number;


    payload?:
        unknown;

}
// ==============================
// AIEngineCoordinator Class
// ==============================


export class AIEngineCoordinator {


    private status:
        CoordinationStatus;


    private tasks:
        Map<string, ITaskContext>;


    private executionHistory:
        ICoordinationResponse[];


    private communications:
        IModuleCommunication[];


    private listeners:
        Map<
            string,
            Array<(event: IEngineEvent)=>void>
        >;



    private createdAt:
        number;



    constructor() {


        this.status =
            "IDLE";



        this.tasks =
            new Map<
                string,
                ITaskContext
            >();



        this.executionHistory =
            [];



        this.communications =
            [];



        this.listeners =
            new Map();



        this.createdAt =
            Date.now();
    }





    // ==============================
    // Basic Information
    // ==============================


    public getStatus():
        CoordinationStatus {


        return this.status;
    }





    public getTasks():
        ITaskContext[] {


        return Array.from(
            this.tasks.values()
        );
    }





    public getHistory():
        ICoordinationResponse[] {


        return [
            ...this.executionHistory
        ];
    }





    public getCommunications():
        IModuleCommunication[] {


        return [
            ...this.communications
        ];
    }





    // ==============================
    // Internal State
    // ==============================


    private setStatus(
        status:
        CoordinationStatus
    ):
    void {


        this.status =
            status;


        this.emit({

            type:
                "COORDINATOR.STATUS_CHANGED",

            timestamp:
                Date.now(),

            payload:
                status

        });
    }
// ==============================
// Task Creation
// ==============================


public createTask(
    request: ICoordinationRequest
):
ITaskContext {


    const context:
        ITaskContext = {


        taskId:
            request.id,


        request:
            request,


        modules:
            [],


        startedAt:
            Date.now()

    };



    this.tasks.set(

        request.id,

        context

    );



    this.emit({

        type:
            "TASK.CREATED",

        timestamp:
            Date.now(),

        payload:
            context

    });



    return context;
}





// ==============================
// Module Routing
// ==============================


public routeTask(
    taskId:
    string,

    modules:
    string[]

):
boolean {


    const task =
        this.tasks.get(
            taskId
        );



    if(!task) {

        return false;
    }



    task.modules =
        [
            ...modules
        ];



    this.tasks.set(

        taskId,

        task

    );



    this.emit({

        type:
            "TASK.ROUTED",

        timestamp:
            Date.now(),

        payload:
            task

    });



    return true;
}





// ==============================
// Execution Planning
// ==============================


public createExecutionPlan(
    taskId:
    string
):
string[] {


    const task =
        this.tasks.get(
            taskId
        );



    if(!task) {

        return [];
    }



    return [

        "ANALYZE_REQUEST",

        "SELECT_MODULES",

        ...task.modules,

        "COLLECT_RESULTS",

        "FINAL_RESPONSE"

    ];
}





// ==============================
// Task Start
// ==============================


public startTask(
    taskId:
    string
):
boolean {


    if(
        !this.tasks.has(
            taskId
        )
    ) {


        return false;
    }



    this.setStatus(
        "EXECUTING"
    );



    this.emit({

        type:
            "TASK.STARTED",

        timestamp:
            Date.now(),

        payload:
            taskId

    });



    return true;
}





// ==============================
// Task Completion
// ==============================


public completeTask(
    response:
    ICoordinationResponse
):
void {


    this.executionHistory.push(

        response

    );



    this.setStatus(

        "COMPLETED"

    );



    this.emit({

        type:
            "TASK.COMPLETED",

        timestamp:
            Date.now(),

        payload:
            response

    });
      }
// ==============================
// Module Communication
// ==============================


public sendMessage(
    communication:
    IModuleCommunication
):
boolean {


    try {


        this.communications.push(

            communication

        );



        this.emit({

            type:
                "MODULE.MESSAGE_SENT",

            timestamp:
                Date.now(),

            payload:
                communication

        });



        return true;



    } catch(error) {


        return false;
    }
}





public broadcast(
    source:
    string,

    message:
    unknown

):
void {


    this.emit({

        type:
            "MODULE.BROADCAST",

        timestamp:
            Date.now(),

        payload: {

            source,

            message

        }

    });
}





// ==============================
// Task Monitoring
// ==============================


public monitorTask(
    taskId:
    string
):
ITaskContext | undefined {


    return this.tasks.get(
        taskId
    );
}





public cancelTask(
    taskId:
    string
):
boolean {


    const removed =
        this.tasks.delete(
            taskId
        );



    if(removed) {


        this.setStatus(
            "CANCELLED"
        );


        this.emit({

            type:
                "TASK.CANCELLED",

            timestamp:
                Date.now(),

            payload:
                taskId

        });
    }



    return removed;
}





// ==============================
// Recovery Handling
// ==============================


public recover(
    taskId:
    string
):
boolean {


    const task =
        this.tasks.get(
            taskId
        );



    if(!task) {

        return false;
    }



    this.setStatus(
        "PLANNING"
    );



    this.emit({

        type:
            "TASK.RECOVERY_STARTED",

        timestamp:
            Date.now(),

        payload:
            taskId

    });



    return true;
}





// ==============================
// Event System
// ==============================


public on(
    event:
    string,

    callback:
    (event: IEngineEvent)=>void

):
void {


    const handlers =
        this.listeners.get(
            event
        )
        ||
        [];



    handlers.push(
        callback
    );



    this.listeners.set(

        event,

        handlers

    );
}





public emit(
    event:
    IEngineEvent

):
void {


    const handlers =
        this.listeners.get(
            event.type
        );



    if(!handlers) {

        return;
    }



    for(
        const handler
        of handlers
    ) {


        try {


            handler(
                event
            );


        } catch(error) {

              console.error(
                "Coordinator event error",
                error
            );
        }
     }
  }
// ==============================
// Validation
// ==============================


public validateRequest(
    request:
    ICoordinationRequest
):
boolean {


    return !!(

        request.id
        &&
        request.task
        &&
        request.taskType

    );
}





public validateTask(
    taskId:
    string
):
boolean {


    return this.tasks.has(
        taskId
    );
}





// ==============================
// Status Information
// ==============================


public getInfo():
Record<string, unknown>
{


    return {


        status:
            this.status,


        activeTasks:
            this.tasks.size,


        completedTasks:
            this.executionHistory.length,


        communications:
            this.communications.length,


        createdAt:
            this.createdAt,


        uptime:
            Date.now()
            -
            this.createdAt

    };
}





// ==============================
// Clear Data
// ==============================


public clear():
void {


    this.tasks.clear();


    this.executionHistory = [];


    this.communications = [];


    this.listeners.clear();


    this.setStatus(
        "IDLE"
    );
}





// ==============================
// Shutdown
// ==============================


public shutdown():
void {


    this.clear();


    this.emit({

        type:
            "COORDINATOR.SHUTDOWN",

        timestamp:
            Date.now()

    });
}





// ==============================
// State Checks
// ==============================


public isRunning():
boolean {


    return (

        this.status === "EXECUTING"

    );
}





public isIdle():
boolean {


    return (

        this.status === "IDLE"

    );
}
}
