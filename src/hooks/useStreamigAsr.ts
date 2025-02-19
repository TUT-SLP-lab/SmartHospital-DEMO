import { useCallback, useState } from "react";

/** WebSocket URL は .env ファイルで管理 */
const WEBSOCKET_BASE_URL = 'wss://172.17.254.199/ws'; //wss://133.15.57.115/ws';
const SAMPLE_RATE = 16000;

/**
 * ログ出力用関数
 * イベントをわかりやすく記録（デバッグ用途）
 */
const logger = <T>(type: string, param?: T) =>
  console.info(...(param ? [type, param] : [type]));

/**
 * ストリーミング音声認識のカスタムフック
 * React 環境で WebSocket を使用した音声認識を行う
 */
export const useStreamingAsr = () => {
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [userMedia, setUserMedia] = useState<MediaStream | null>(null);
  const [transcript, setTranscript] = useState<string>("");
  const [listening, setListening] = useState<boolean>(false);

  /** 認識結果をリセット */
  const resetTranscript = () => {
    setTranscript(() => "");
    logger("resetTranscript");
  };

  /** 録音を開始する */
  const startListening = useCallback(async () => {
    try {
      if (!WEBSOCKET_BASE_URL) {
        throw new Error("WebSocket URL is not defined in the environment variables.");
      }

      /** 録音フラグを設定 */
      setListening(() => true);

      /** マイクストリームを取得 */
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      /** AudioContext を初期化 */
      const context = new AudioContext({ sampleRate: SAMPLE_RATE });
      const source = context.createMediaStreamSource(stream);

      /** Audio Worklet をロード */
      await context.audioWorklet.addModule("/audio-processor.js");
      const audioWorkletNode = new AudioWorkletNode(context, "recorder");

      source.connect(audioWorkletNode);
      audioWorkletNode.connect(context.destination);

      setAudioContext(() => context);
      setUserMedia(() => stream);

      logger("stream", stream);
      logger("context", context);
      logger("source", source);

      /** WebSocket を初期化 */
      const connect = new WebSocket(WEBSOCKET_BASE_URL);

      /** WebSocket 接続時の処理 */
      connect.onopen = (evt: Event) => {
        audioWorkletNode.port.onmessage = (msg) => {
          connect.send(msg.data.buffer);
        };
        logger("WebSocket connected", evt);
      };

      /** サーバーからのメッセージを処理 */
      connect.onmessage = (evt: MessageEvent) => {
        setTranscript((v) => [v, evt.data].join("\n"));
        logger("Received message", evt);
      };

      /** エラー処理 */
      connect.onerror = (evt: Event) => {
        logger("WebSocket error", evt);
      };

      /** WebSocket 接続を閉じたときの処理 */
      connect.onclose = (evt: CloseEvent) => {
        setListening(() => false);
        logger("WebSocket closed", evt);
      };

      setWebsocket(() => connect);
    } catch (error) {
      logger("Error starting listening", error);
    } finally {
      logger("startListening finished");
    }
  }, []);

  /** 録音を停止する */
  const stopListening = useCallback(() => {
    try {
      if (websocket) {
        websocket.close();
        logger("WebSocket closed");
      }

      if (audioContext) {
        audioContext.close();
        logger("AudioContext closed");
      }

      if (userMedia) {
        userMedia.getAudioTracks().forEach((track) => track.stop());
      }

      setListening(() => false);
    } catch (error) {
      logger("Error stopping listening", error);
    } finally {
      logger("stopListening finished");
    }
  }, [websocket, audioContext, userMedia]);

  return {
    transcript,
    setTranscript,
    resetTranscript,
    listening,
    startListening,
    stopListening,
    websocket,
  };
};


// import { useCallback, useState } from "react";

// /** .envなどに持たせた方が良いか相談 */
// const WEBSOCKET_BASE_URL = import.meta.env.VITE_WEBSOCKET_URL;
// const SAMPLE_RATE = 16000;

// /**
//  * log出力するための関数
//  * イベントの発生などをわかりやすくしているので、不要なら削除お願い致します
//  */
// const logger = <T>(type: string, param?: T) =>
//   console.info(...(param ? [type, param] : [type]));

// /**
//  * ストリーミング音声認識を行うためのカスタムフック
//  * フックとしての振る舞いはreact-speech-recognitionと同じものを目指す
//  * @see https://www.npmjs.com/package/react-speech-recognition
//  */
// export const useStreamingAsr = () => {
//   /**
//    * WebSocketの定義
//    * 通信の状態などWebSocketインスタンスのプロパティなどを使用可能
//    * @see https://developer.mozilla.org/ja/docs/Web/API/WebSocket
//    */
//   const [websocket, setWebsocket] = useState<WebSocket | null>(null);
//   /**
//    * AudioContextの定義
//    * @see https://developer.mozilla.org/ja/docs/Web/API/AudioContext
//    */
//   const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
//   /**
//    * メディアコンテンツのストリーム
//    * @see https://developer.mozilla.org/ja/docs/Web/API/MediaStream
//    */
//   const [userMedia, setUserMedia] = useState<MediaStream | null>(null);

//   /** 認識されたテキスト */
//   const [transcript, setTranscript] = useState<string>("");

//   /** 録音中かどうか */
//   const [listening, setListening] = useState<boolean>(false);

//   /** 認識されたテキストをリセットする */
//   const resetTranscript = () => {
//     try {
//       setTranscript(() => "");
//     } finally {
//       logger("resetTranscript");
//     }
//   };

//   /** 録音を開始する */
//   const startListening = useCallback(async () => {
//     try {
//       /** 録音の開始 */
//       setListening(() => true);

//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//       });

//       const context = new AudioContext({ sampleRate: SAMPLE_RATE });
//       const source = context.createMediaStreamSource(stream);

//       await context.audioWorklet.addModule("/audio-processor.js");

//       const audioWorkletNode = new AudioWorkletNode(context, "recorder");

//       source.connect(audioWorkletNode);
//       audioWorkletNode.connect(context.destination);

//       setAudioContext(() => context);
//       setUserMedia(() => stream);

//       logger("stream", stream);
//       logger("context", context);
//       logger("source", source);

//       /** websocketオブジェクトを作成 */
//       const connect = new WebSocket(WEBSOCKET_BASE_URL);

//       /** WebSocket接続時 */
//       connect.onopen = (evt: Event) => {
//         audioWorkletNode.port.onmessage = (msg) => {
//           connect.send(msg.data.buffer);
//         };

//         logger("onopen", evt);
//       };

//       /** バックエンドからのメッセージを受信した時 */
//       connect.onmessage = (evt: MessageEvent) => {
//         /** サーバからの文字列を連結 */
//         setTranscript((v) => [v, evt.data].join("\n"));

//         logger("onmessage", evt);
//       };

//       /** WebSocket接続時 */
//       connect.onerror = (evt: Event) => {
//         logger("onerror", evt);
//       };

//       /** WebSocketのコネクションを閉じた時 */
//       connect.onclose = (evt: CloseEvent) => {
//         setListening(() => false);

//         logger("onclose", evt);
//       };

//       setWebsocket(() => connect);
//     } finally {
//       logger("startListening");
//     }
//   }, []);

//   /** 録音を停止する */
//   const stopListening = useCallback(() => {
//     try {
//       /** WebSocket通信の停止 */
//       if (websocket) {
//         websocket.close();

//         logger("close WebSocket");
//       }

//       /**
//        * 音声リソースを全て解放
//        * @see https://developer.mozilla.org/ja/docs/Web/API/AudioContext/close
//        */
//       if (audioContext) {
//         audioContext.close();

//         logger("close AudioContext");
//       }

//       /**
//        * ブラウザでアクセスしているオーディオの停止
//        * @see https://developer.mozilla.org/ja/docs/Web/API/MediaStream/getAudioTracks
//        */
//       if (userMedia) {
//         for (const media of userMedia.getAudioTracks()) {
//           media.stop();
//         }
//       }

//       setListening(() => false);
//     } finally {
//       logger("stopListening");
//     }
//   }, [websocket, audioContext, userMedia]);

//   return {
//     transcript,
//     resetTranscript,
//     listening,
//     startListening,
//     stopListening,
//     websocket,
//   };
// };