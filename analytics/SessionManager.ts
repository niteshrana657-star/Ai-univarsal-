/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Analytics Module
 * File: SessionManager.ts
 * -------------------------------------------------------------
 */

export interface SessionInfo {

  id: string;

  userId?: string;

  startedAt: number;

  endedAt?: number;

  duration: number;

  active: boolean;

}

export class SessionManager {

  private session:
    SessionInfo | null = null;

  /**
   * Start Session
   */
  public start(

    id: string,

    userId?: string

  ): SessionInfo {

    this.session = {

      id,

      userId,

      startedAt:
        Date.now(),

      duration: 0,

      active: true

    };

    return this.session;

  }

  /**
   * End Session
   */
  public end():
    SessionInfo | null {

    if (!this.session) {

      return null;

    }

    this.session.endedAt =
      Date.now();

    this.session.duration =

      this.session.endedAt -

      this.session.startedAt;

    this.session.active =
      false;

    return this.session;

  }

  /**
   * Current Session
   */
  public getCurrent():
    SessionInfo | null {

    return this.session;

  }

  /**
   * Is Active
   */
  public isActive():
    boolean {

    return (

      this.session !== null &&

      this.session.active

    );

  }

  /**
   * Session Duration
   */
  public getDuration():
    number {

    if (!this.session) {

      return 0;

    }

    if (!this.session.active) {

      return this.session.duration;

    }

    return (

      Date.now() -

      this.session.startedAt

    );

  }

  /**
   * Reset Session
   */
  public reset():
    void {

    this.session = null;

  }

}

const sessionManager =
  new SessionManager();

export default sessionManager;
