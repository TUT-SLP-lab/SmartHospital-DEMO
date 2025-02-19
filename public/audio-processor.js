/**
 * サービスワーカーとして動作させるためpublic配下におく必要がある
 * @see https://zenn.dev/nakatama/articles/f277a746458202
 */
class Recorder extends AudioWorkletProcessor {
    process(inputs) {
      const inp = inputs[0][0];
      this.port.postMessage(inp);
      return true;
    }
  }
  
  registerProcessor("recorder", Recorder);