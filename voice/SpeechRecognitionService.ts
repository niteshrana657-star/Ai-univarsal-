/**
 * SpeechRecognitionService.ts
 * Universal AI Operating Companion
 *
 * Handles:
 * - Speech to Text foundation
 * - Voice recognition state
 * - Language management
 * - Recognition events bridge
 * - AI command input preparation
 */

export interface SpeechRecognitionResult {
  text: string;
  language: string;
  confidence: number;
  timestamp: number;
}

export interface SpeechRecognitionSettings {
  language: string;
  continuous: boolean;
  interimResults: boolean;
  autoRestart: boolean;
}

class SpeechRecognitionService {

  private settings: SpeechRecognitionSettings;

  private isActive: boolean = false;

  private lastResult: SpeechRecognitionResult | null = null;

  private listeners: Array<
    (result: SpeechRecognitionResult) => void
  > = [];


  constructor() {

    this.settings = {
      language: "en-US",
      continuous: true,
      interimResults: false,
      autoRestart: true,
    };

  }


  /**
   * Initialize speech recognition
   */
  async initialize(): Promise<boolean> {

    try {

      console.log(
        "Speech Recognition Service initialized"
      );

      return true;

    } catch (error) {

      console.error(
        "Speech recognition initialization failed:",
        error
      );

      return false;
    }

  }


  /**
   * Update recognition settings
   */
  updateSettings(
    settings: Partial<SpeechRecognitionSettings>
  ): void {

    this.settings = {
      ...this.settings,
      ...settings,
    };

  }


  /**
   * Get settings
   */
  getSettings(): SpeechRecognitionSettings {

    return this.settings;

  }


  /**
   * Start recognition
   */
  async start(): Promise<boolean> {

    try {

      this.isActive = true;

      console.log(
        "Speech recognition started"
      );

      /*
        Native Android SpeechRecognizer
        integration will connect here.
      */

      return true;


    } catch(error) {

      console.error(
        "Speech start failed:",
        error
      );

      return false;

    }

  }


  /**
   * Stop recognition
   */
  stop(): void {

    this.isActive = false;

    console.log(
      "Speech recognition stopped"
    );

  }


  /**
   * Receive recognized speech text
   */
  processResult(
    text: string,
    confidence: number = 1
  ): SpeechRecognitionResult {


    const result: SpeechRecognitionResult = {

      text,

      language:
        this.settings.language,

      confidence,

      timestamp:
        Date.now(),

    };


    this.lastResult = result;


    this.notifyListeners(result);


    return result;

  }



  /**
   * Get latest speech result
   */
  getLastResult():
    SpeechRecognitionResult | null {

    return this.lastResult;

  }



  /**
   * Add recognition listener
   */
  addListener(
    callback:
      (result: SpeechRecognitionResult) => void
  ): void {

    this.listeners.push(callback);

  }



  /**
   * Remove listener
   */
  removeListener(
    callback:
      (result: SpeechRecognitionResult) => void
  ): void {


    this.listeners =
      this.listeners.filter(
        listener =>
          listener !== callback
      );

  }



  /**
   * Send result to listeners
   */
  private notifyListeners(
    result: SpeechRecognitionResult
  ): void {


    this.listeners.forEach(
      listener => {

        try {

          listener(result);

        } catch(error) {

          console.error(
            "Speech listener error:",
            error
          );

        }

      }
    );

  }



  /**
   * Change recognition language
   */
  setLanguage(
    language: string
  ): void {

    this.settings.language = language;

  }



  /**
   * Get recognition status
   */
  getStatus() {

    return {

      active:
        this.isActive,

      language:
        this.settings.language,

      lastResult:
        this.lastResult,

    };

  }



  /**
   * Check microphone requirement
   */
  requiresMicrophonePermission():
    boolean {

    return true;

  }

}


export default new SpeechRecognitionService();
