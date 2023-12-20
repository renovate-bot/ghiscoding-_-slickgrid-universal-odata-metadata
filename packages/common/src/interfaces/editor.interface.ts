import { EditorArguments } from './editorArguments.interface';
import { EditorValidationResult } from './editorValidationResult.interface';

/**
 * SlickGrid Editor interface, more info can be found on the SlickGrid repo
 * https://github.com/6pac/SlickGrid/wiki/Writing-custom-cell-editors
 */
export interface Editor {
  /** is the Editor disabled when we first open it? This could happen when we use "collectionAsync" and we wait for the "collection" to be filled before enabling the Editor. */
  disabled?: boolean;

  /** Initialize the Editor */
  init: (args?: EditorArguments) => void;

  /**
   * Dynamically change an Editor option, this is especially useful when using a Composite Editor
   * since this is the only way to change/update an option of the Editor after its creation
   * (not all Editors support this feature, current only available with AutoComplete, Date, MultipleSelect & SingleSelect Editors).
   * For example, a use case could be to dynamically change the "minDate" of another Date Editor in the Composite Editor form.
   * @param {string} optionName - option name
   * @param {newValue} newValue - new option value
   */
  changeEditorOption?: (optionName: string, newValue: any) => void;

  /**
   * Disable the Editor input
   * @param {boolean} isDisabled - optionally specify if the editor is disabled or not.
   */
  disable?: (isDisabled?: boolean) => void;

  /** Saves the Editor value */
  save?: () => void;

  /** Cancels the Editor */
  cancel?: () => void;

  /**
   * if implemented, this will be called if the cell being edited is scrolled out of the view
   * implement this is your UI is not appended to the cell itself or if you open any secondary
   * selector controls (like a calendar for a datepicker input)
   */
  hide?: () => void;

  /** pretty much the opposite of hide */
  show?: () => void;

  /**
   * if implemented, this will be called by the grid if any of the cell containers are scrolled
   * and the absolute position of the edited cell is changed
   * if your UI is constructed as a child of document BODY, implement this to update the
   * position of the elements as the position of the cell changes
   * @param {object} - cellBox position: { top, left, bottom, right, width, height, visible }
   */
  position?: (position: any) => void;

  /** remove all data, events & dom elements created in the constructor */
  destroy: () => void;

  /** set the focus on the main input control (if any) */
  focus: () => void;

  /**
   * Deserialize the value(s) saved to "state" and apply them to the data item.
   * This method may get called after the editor itself has been destroyed,
   * treat it as an equivalent of a Java/C# "static" method - no instance variables should be accessed
   */
  applyValue: (item: any, state: any) => void;

  /**
   * Load the value(s) from the data item and update the UI
   * this method will be called immediately after the editor is initialized
   * it may also be called by the grid if if the row/cell being edited is updated via grid.updateRow/updateCell
   */
  loadValue: (item: any) => void;

  /**
   * Return the value(s) being edited by the user in a serialized form
   * can be an arbitrary object
   * the only restriction is that it must be a simple object that can be passed around even
   * when the editor itself has been destroyed
   */
  serializeValue: () => any;

  /** return true if the value(s) being edited by the user has/have been changed */
  isValueChanged: () => boolean;

  /** Optional render DOM element function */
  renderDomElement?: (collection?: any[]) => any;

  /** Update the Editor DOM element value with a provided value, we can optionally apply the value to the item dataContext object */
  setValue?: (value: any, isApplyingValue?: boolean) => void;

  /**
   * Validate user input and return the result along with the validation message.
   * if the input is valid then the validation result output would be returning { valid:true, msg:null }
   * The first argument "targetElm" is ONLY used internally by the Composite Editor in most cases you want to make this null or undefined
   */
  validate: (targetElm?: HTMLElement | JQuery<HTMLElement> | null, options?: any) => EditorValidationResult;
}