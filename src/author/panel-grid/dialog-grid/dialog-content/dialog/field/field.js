import { TextField } from '../../../../../text-field/text-field'
import { TextFieldStory } from './text-field/text-field-story';
import { MDEditor } from '../../../../md-editor/md-editor';
import { MDEditorStory } from './md-editor/md-editor-story';
import { toElement } from '../../../../../../lib/elements'

class Field extends HTMLElement {
  static name = 'field'

  static elementProperties = new Map([
    ['markdown', { type: Boolean }]
  ])

  get elementTemplate() {
    const default_text_choice = this.defineElement(
      TextField, {
        defaults: { property: '' }
      }
    );
    const default_editor_choice = this.defineElement(
      MDEditor, {
        defaults: { property: '', linking: false },
        attributes: [ 'linking' ]
      }
    )
    const text_choices = {
      'STORY-DIALOG': this.defineElement(
        TextFieldStory, {
          defaults: { property: '' }
        }
      )
    }
    const editor_choices = {
      'STORY-DIALOG': this.defineElement(
        MDEditorStory, {
          defaults: { property: '', linking: false },
          attributes: [ 'linking' ]
        }
      )
    }
    const choose_editor = (dialog) => {
      return editor_choices[dialog] || default_editor_choice;
    }
    const choose_text = (dialog) => {
      return text_choices[dialog] || default_text_choice;
    }
    const field = () => {
      const { 
        markdown, label, property,
        dialog, notice
      } = this.elementState;
      if (markdown) {
        const mdEditorElement = choose_editor(dialog);
        const editor = () => {
          return toElement(mdEditorElement)``({ 
            property, linking: () => (
              notice == 'LINK-NOTICE'
            )
          });
        }
        return toElement('div')`
          <label>${() => label}</label>
          ${editor}
        `({
          class: 'contents'
        });
      }
      const textFieldElement = choose_text(dialog); 
      return toElement(textFieldElement)``({
        label, property
      })
    }
    return toElement('div')`${field}`({
      class: 'contents'
    });
  }
}

export { Field }
