module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Socket connection to server is established: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has been terminated`);
    });
  });
};
