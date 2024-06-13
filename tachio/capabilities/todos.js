const { parseJSONArg, TODO_TABLE_NAME } = require("../helpers");
const { supabase } = require('../src/supabaseclient')
const logger = require("../src/logger")('capability-todos')

/**
 * Creates a new todo item in your todo list.
 * When to Use: Use this capability when a new task arises that needs tracking within a project's context.
 * How to Use:
 * Prepare Todo Details: Gather the details of the todo to be created, including the mandatory projectId and name fields, along with any other optional information.
 * Call the Function: Invoke the createTodo function with the prepared object. Handle the promise returned by the function to deal with the newly created todo or to catch any errors, for example: supabaseTodo:createTodo(Add labeling system for todos, Figure out 5 top-level labels and add a field in the todo table to store them).
 * Process Response: On successful creation, use the returned todo item for display, further processing, or confirmation to the user.
 *
 * @param {number} projectId - The project ID of the todo item.
 * @param {string} title - The title of the todo item.
 * @param {string} description - The description of the todo item.
 * @param {string} status - The status of the todo item. The value is one of 'icebox', 'todo', 'in_progress', 'done'.
 * @param {string} priority - The priority of the todo item. The value is one of 'now', 'next', 'later'.
 * @param {string} externalUrls - A newline-delimited string to represent external URLs (e.g., linear or github issue or pull request).
 * @param {string} username - Email of the user creating the todo.
 * @returns {Promise<string>} A promise that resolves to a success message.
 * @example supabasetodo:createTodo(Add labeling system for todos, Figure out 5 top-level labels and add a field in the todo table to store them).
 */
async function createTodo({ projectId, title, username, status = "todo", priority = "later", description = "", externalUrls = '' }) {
  if (!title) throw new Error("A title is required to create a todo");
  const { error } = await supabase.from(TODO_TABLE_NAME).insert([
    {
      id: crypto.randomUUID(),
      project_id: projectId,
      title,
      status,
      priority,
      external_urls: externalUrls,
      description,
      username,
      created_at: new Date(),
    },
  ]);

  if (error) throw new Error(error.message);
  return `Successfully added todo: ${title}`;
}

// deleteTodo.js

/**
 * Deletes a todo item from the database.
 * This capability allows for the deletion of a specified todo item from the database. All you need is the ID of the todo you would like to delete. This capability is essential for maintaining the relevance and accuracy of the todo list by removing completed, cancelled, or outdated tasks.
 * When to Use: Utilize this capability when a todo item is no longer needed or relevant. This could be after the completion of a task, cancellation of a project, or any situation where a todo does not need to be tracked anymore.
 * How to Use:
 * Determine Todo ID: Identify the ID of the todo item that needs to be deleted.
 * Call the Function: Execute the deleteTodo function with the identified todo ID. Manage the promise to address any errors and confirm deletion: supabaseTodo:deleteTodo(123).
 * Verify Deletion: The function returns a boolean value indicating the success of the deletion operation. Use this to provide feedback to the user or to update the application state accordingly.
 *
 * @param {number} todoId - ID of the todo to be deleted.
 * @returns {Promise<string>} A promise that resolves to true if the deletion was successful, false otherwise.
 * @example supabasetodo:deleteTodo(123).
 */
async function deleteTodo(todoId) {
  const { error } = await supabase
    .from(TODO_TABLE_NAME)
    .delete()
    .match({ id: todoId });

  if (error) {
    console.error("Error deleting todo:", error.message);
    return `Error deleting todo with ID: ${todoId} ${error.message}`;
  }
  return `Successfully deleted todo with ID: ${todoId}`;
}

/*

*/

/**
 * Unlike other todo methods, this one accepts a javascript object as the second argument. This object can contain any of the fields that need to be updated: name, description, and data (JSON)
 *
 * @param {number} todoId - ID of the todo to be updated.
 * @param {Object} updates - Object containing the fields to update.
 * @returns {Promise<Object>} A promise that resolves to the updated todo item.
 */
async function updateTodo(todoId, updates) {
  if (!updates || Object.keys(updates).length === 0) {
    throw new Error("Updates object is required and cannot be empty");
  }
  const { data, error } = await supabase
    .from(TODO_TABLE_NAME)
    .update(updates)
    .match({ id: todoId });

  if (error) throw new Error(error.message);
  if (!data) return "No todo found with that ID.";
  return `Successfully update todo with ID: ${todoId}`;
}

/*
This capability enables updating specific fields of an existing todo item, such as its status, priority, or due date. It allows partial updates, making it flexible for reflecting changes in todo items over time without needing to specify the entire todo details.

When to Use: Use this capability when there's a need to modify an existing todo item, such as marking it as completed, updating its due date, or changing its priority based on new information or project changes.

How to Use:

Identify Todo and Changes: Determine the ID of the todo you wish to update and prepare an object with the fields that need updating.
Call the Function: Invoke the updateTodo function with the todo ID and the updates object. Handle the promise to catch any potential errors.
Process Response: Use the updated todo item returned by the function to verify the updates and inform the user or further application logic.
*/

/* list todo function */

/**
 * Lists all todo items in the database.
 * This capability allows for the retrieval of all todo items from the database. It is a simple function that returns an array of all todo items, which can be used for display, processing, or further manipulation.
 * When to Use: Utilize this capability when you need to display all the todo items in a project, or when you need to process or manipulate the entire list of todos.
 * How to Use:
 * Call the Function: Execute the listTodos function. Handle the promise to catch any errors and process the array of todo items returned.
 * Process Response: Use the array of todo items for display, processing, or further manipulation as needed.
 * @returns {Promise<string>} A promise that resolves to an array of all todo items.
 *
 */
async function listTodos() {
  const { data, error } = await supabase.from(TODO_TABLE_NAME).select();

  if (error) throw new Error(error.message);
  return JSON.stringify(data);
}

module.exports = {
  handleCapabilityMethod: async (method, args) => {
    const jsonArgs = parseJSONArg(args)
    logger.info(`⚡️ Calling capability method: todos.${method} \n ${args}`);

    if (method === "createTodo") {
      return await createTodo(jsonArgs);
    } else if (method === "deleteTodo") {
      return await deleteTodo(jsonArgs.todoId);
    } else if (method === "updateTodo") {
      const { todoId } = jsonArgs
      delete jsonArgs.todoId;
      return await updateTodo(todoId, jsonArgs.updates);
    } else if (method === "listTodos") {
      return await listTodos();
    } else {
      throw new Error(`Invalid method: ${method}`);
    }
  },
  listTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  TODO_TABLE_NAME
};
