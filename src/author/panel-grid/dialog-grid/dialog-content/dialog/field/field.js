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
    const choose_editor = (dialog) => {
      return {
        'STORY-DIALOG': MDEditorStory
      }[dialog] || MDEditor;
    }
    const choose_text = (dialog) => {
      return {
        'STORY-DIALOG': TextFieldStory,
      }[dialog] || TextField;
    }
    const field = () => {
      const { 
        markdown, label, property,
        dialog, notice
      } = this.elementState;
      if (markdown) {
        const mdEditorElement = this.defineElement(
          choose_editor(dialog), {
            defaults: { property: '', linking: false },
            attributes: [ 'linking' ]
          }
        )
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
      const textFieldElement = this.defineElement(
        choose_text(dialog), {
          defaults: { property: '' }
        }
      )
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
