// Abort Controller In Fetch Request
const upload = (file: File) => {
  const controller = new AbortController();

  const response = fetch("/upload", {
    method: "POST",
    body: file,
    // there are 2 condition to cancel fetch request:
    // 1.abort this request on call 'controller.abort()'
    // 2.if it takes more than 3000ms
    signal: AbortSignal.any([controller.signal, AbortSignal.timeout(3000)]),
  });

  return { response, controller };
};

// Abort Listener
const controller = new AbortController();
controller.signal.addEventListener("abort", () => {
  // you can make any logic here
  console.log(controller.signal.reason);
});

controller.abort("user_canceled");
