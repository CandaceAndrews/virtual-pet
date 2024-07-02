import { reactive } from 'vue';

const eventBus = reactive({});

eventBus.$emit = (event, ...args) => {
  if (!eventBus[event]) {
    return;
  }
  eventBus[event].forEach(callback => callback(...args));
};

eventBus.$on = (event, callback) => {
  if (!eventBus[event]) {
    eventBus[event] = [];
  }
  eventBus[event].push(callback);
};

eventBus.$off = (event, callback) => {
  if (!eventBus[event]) {
    return;
  }
  eventBus[event] = eventBus[event].filter(cb => cb !== callback);
};

export default eventBus;

