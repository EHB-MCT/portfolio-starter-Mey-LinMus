const app = require("./app");
/**
 * Start the Express server and listen on the specified port.
 *
 * @function startServer
 * @param {number} port - The port number on which the server should listen.
 * @param {Function} callback - A callback function to execute when the server starts.
 * @returns {void}
 */

function startServer(port, callback) {
  app.listen(port, callback);
}

const PORT = process.env.PORT || 3000;

startServer(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
