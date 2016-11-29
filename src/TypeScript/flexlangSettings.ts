"use strict";

/**
 * Object containing the complete configuration of the flexlang plugin.
 */
class FlexlangSettings {
  private logger : FlexlangLogger;
  public get Logger() : FlexlangLogger { return this.logger; };
  public set Logger(logger : FlexlangLogger) { this.logger = logger; };

  /**
   * Initialize a new instance of FlexlangSettings
   */
  constructor(logger : FlexlangLogger) {
    this.logger = logger;
  }

  /**
   * Will create a FlexlangSettings instance from a JSON object.
   */
  public static fromJson(object) : FlexlangSettings {
    let logger : FlexlangLogger = console.log;
    if (object.logger !== undefined)
      logger = object.logger;
    return new FlexlangSettings(logger);
  }
  /**
   * Will create a FlexlangSettings instance from a path pointing to a json file.
   */
  public static fromJsonPath(path: string) : FlexlangSettings {
    let y : FlexlangSettings;
    $.get(path, x => { y = FlexlangSettings.fromJson(x); }, "json");
    return y;
  }
}
