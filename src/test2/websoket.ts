import throttle from "lodash/throttle";
import { onUnmounted, ref } from "vue";

interface ButtonData {
  id: string;
  title: string;
}


export function useWebSocket() {
  const ws = initWebSocket();

  let buttonsNotReactive: ButtonData[] = [];
  const buttons = ref<ButtonData[]>([]);


  ws.onmessage = (data) => {
    buttonsNotReactive = data.data;
    throttledUpdateButtons();
  }

  const throttledUpdateButtons = throttle(updateButtons, 1000, {leading: true});
  function updateButtons() {
    buttons.value = buttonsNotReactive;
  }

  onUnmounted(() => {
    ws.close();
  });

  return {
    buttons
  };
}

// Mock WebSocket
const webSocketObjectMock =  {
  close: () => {
    console.log('WebSocket closed');
  }
} as  WebSocket;

function initWebSocket(): WebSocket {
  return webSocketObjectMock;
}


let item = 1
setInterval(() => {
  webSocketObjectMock.onmessage?.({ data: generateButtons() } as unknown as MessageEvent<ButtonData[]>);
  item++;
}, 100);

function generateButtons() {
  const generatedButtons = [];
  
  for (let i = 0; i < 10; i++) {
    generatedButtons.push({ id: i.toString(), title: `button ${Math.round(Math.random() * 1000000)}` });
  }

  return generatedButtons;
}