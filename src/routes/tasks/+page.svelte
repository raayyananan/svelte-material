<script lang="ts">
    import { fly, slide } from "svelte/transition";

    interface Task {
        id: string,
        description: string 
    }

    let tasks: Array<Task> = [
        {
            id: crypto.randomUUID(),
            description: 'Do the laundry'
        },
        {
            id: crypto.randomUUID(),
            description: 'Learn sveltekit'
        },
        {
            id: crypto.randomUUID(),
            description: 'Complete the squiggly slider'
        }
    ];

    const deleteTodo = (id: string) => {
        const task = tasks.findIndex((task) => task.id === id);
        if (task === -1) return
        
        tasks.splice(task, 1);
        tasks = tasks;
    }

    let newTaskDescription: string;
    const updateTask = (e: Event | any) => {
        newTaskDescription = e.target.value;
    }
    const checkSumbission = (e: Event | any) => {
        if (e.key == 'Enter') {
            handleSubmission(e)
        }
    }

    const handleSubmission = (e: Event) => {
        e.preventDefault();

        if (newTaskDescription === '' || newTaskDescription === undefined) return;

        tasks.unshift({
            id: crypto.randomUUID(),
            description: newTaskDescription
        });
        tasks = tasks;
        (document.querySelector('#textfield')! as HTMLInputElement).value = '';
        document.querySelector('#textfield')!.shadowRoot!.querySelector('input')!.blur();
        newTaskDescription = '';
    }
</script>

<div class="tasks-container">
    <ul class="tasks">
        <form class="top-bar" action="" method="post" on:submit={handleSubmission}>
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <md-outlined-text-field id="textfield" label="Add new task" type="text" on:input={updateTask} on:keypress={checkSumbission}></md-outlined-text-field>
            <md-filled-tonal-icon-button type="submit"><md-icon class="material-symbols-outlined">add</md-icon></md-filled-tonal-icon-button>
        </form>
        {#each tasks as task (task.id)}
        <li out:slide={{ duration: 100 }}>
            <div class="description">{task.description}</div>
            <md-icon-button on:click={() => deleteTodo(task.id)} on:keyup={() => {}} role="button" tabindex=0>
                <md-icon class="material-symbols-outlined">delete</md-icon>
            </md-icon-button>
            <md-ripple></md-ripple>
        </li>
        {/each}
    </ul>
</div>

<style lang="scss">
    .tasks-container {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
    .tasks {
        list-style-type: none;
        display: flex;
        flex-flow: column nowrap;
        gap: 10px;
        width: 300px;
        padding: 0;
        margin: 0;

        li {
            height: 56px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            padding: 0 5px 0 10px;
            box-sizing: border-box;
            border-radius: 16px;
            animation: slide-in var(--md-sys-motion-duration-short4) cubic-bezier(0.175, 0.885, 0.32, 1.275);

            // --md-icon-button-size
          --md-icon-button-container-size: 74px;
          --md-ripple-hover-opacity: 0.03;

          @keyframes slide-in {
            0% {translate: -20px; scale: 0.75; height: 0px;}
            100% {translate: 0; scale: 1; height: 56px;}
          }

        }
    }
    .top-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        box-sizing: border-box;
        padding: 0 5px;
        width: 100%;
        
        md-outlined-text-field {
            flex: auto;
        }
    }
</style>