<template>
  <div class="editor">
    <div class="menubar">
      <span
        v-for="actionName in activeButtons"
        :key="actionName"
      >
        <b-button
          variant="primary"
          v-if="actionName === 'bold'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('bold') }"
          @click="editor.chain().focus().toggleBold().run()"
        >
          <!-- <icon name="bold" /> -->
          <BIconTypeBold />
        </b-button>
        <b-button
          variant="primary"
          v-if="actionName === 'italic'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('italic') }"
          @click="editor.chain().focus().toggleItalic().run()"
        >
          <BIconTypeItalic />
        </b-button>

        <b-button
          variant="primary"
          v-if="actionName === 'strike'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('strike') }"
          @click="editor.chain().focus().toggleStrike().run()"
        >
          <BIconTypeStrikethrough />
        </b-button>

        <b-button
          variant="primary"
          v-if="actionName === 'underline'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('underline') }"
          @click="editor.chain().focus().toggleUnderline().run()"
        >
          <BIconTypeUnderline />
        </b-button>


        <b-button
          variant="primary"
          v-if="actionName === 'h1'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        >
          <BIconTypeH1 />
        </b-button>

        <b-button
          variant="primary"
          v-if="actionName === 'h2'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          <BIconTypeH2 />
        </b-button>

        <b-button
          variant="primary"
          v-if="actionName === 'h3'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        >
          <BIconTypeH3 />
        </b-button>

        <b-button
          variant="primary"
          v-if="actionName === 'bulletList'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('bulletList') }"
          @click="editor.chain().focus().toggleBulletList().run()"
        >
          <BIconListTask />
        </b-button>

        <b-button
          variant="primary"
          v-if="actionName === 'orderedList'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('orderedList') }"
          @click="editor.chain().focus().toggleOrderedList().run()"
        >
          <BIconListOl />
        </b-button>

        <b-button
          variant="primary"
          v-if="actionName === 'blockquote'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('blockquote') }"
          @click="editor.chain().focus().toggleBlockquote().run()"
        >
          <BIconBlockquoteRight />
        </b-button>

        <b-button
          variant="primary"
          v-if="actionName === 'link'"
          class="menubar__button"
          :class="{ 'is-active': editor.isActive('link') }"
          @click="setLink"
        >
          <BIconLink />
        </b-button>

        <b-button
          variant="primary"
          v-if="actionName === 'horizontalRule'"
          class="menubar__button"
          @click="editor.chain().focus().setHorizontalRule().run()"
        >
          <BIconDash />
        </b-button>
        <b-button
          variant="primary"
          v-if="actionName === 'undo'"
          class="menubar__button"
          @click="editor.chain().focus().undo().run()"
        >
          <BIconArrowCounterclockwise />
        </b-button>

        <b-button
          variant="primary"
          v-if="actionName === 'redo'"
          class="menubar__button"
          @click="editor.chain().focus().redo().run()"
        >
          <BIconArrowClockwise />
        </b-button>
      </span>
    </div>

    <editor-content
      class="editor__content"
      :editor="editor"
    />
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'

import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
// import Icon from './Icon.vue'
import {
  BIconTypeStrikethrough, BIconTypeBold, BIconTypeH1, BIconTypeH2, BIconTypeH3, BIconTypeItalic, BIconTypeUnderline,
  BIconListOl, BIconBlockquoteRight, BIconDash, BIconArrowClockwise, BIconArrowCounterclockwise, BButton, BIconListTask, BIconLink,
} from 'bootstrap-vue'

export default {
  name: 'Editor',
  components: {
    BButton,
    BIconDash,
    BIconLink,
    BIconTypeH1,
    BIconTypeH2,
    BIconTypeH3,
    BIconListOl,
    BIconTypeBold,
    EditorContent,
    BIconListTask,
    BIconTypeItalic,
    BIconTypeUnderline,
    BIconArrowClockwise,
    BIconBlockquoteRight,
    BIconTypeStrikethrough,
    BIconArrowCounterclockwise,
    // Icon,
  },
  props: {
    initialContent: {
      type: String,
      required: true,
      default: '',
    },
    activeButtons: {
      type: Array,
      default: () => ['bold', 'italic'],
    },
  },
  emits: ['update'],
  data() {
    return {
      html: '',
      json: '',
      editor: null,
    }
  },
  methods: {
    setLink() {
      const previousUrl = this.editor.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)

      // cancelled
      if (url === null) {
        return
      }

      // empty
      if (url === '') {
        this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .unsetLink()
          .run()

        return
      }

      // update link
      this.editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
    },
  },
  created() {
    this.editor = new Editor({
      content: this.initialContent,
      extensions: [
        StarterKit, Underline, Link.configure({
          HTMLAttributes: {
            target: null,
            rel: null,
          },
          protocols: ['ftp', 'mailto'],
        }),
      ],
    })

    this.html = this.editor.getHTML()
    this.json = this.editor.getJSON()

    this.editor.on('update', () => {
      this.html = this.editor.getHTML()
      this.json = this.editor.getJSON()
      this.$emit('update', this.html)
    })
  },
  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

<style lang="css" >
  .editor .menubar{
    display: flex;
  align-items: center;
  flex: 0 0 auto;
  flex-wrap: wrap;
  padding: 0.75rem 0rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
  }
  .editor .menubar__button {
  width: 1.75rem;
  height: 1.75rem;
  color: #0d0d0d;
  border: none;
  background-color: transparent;
  border-radius: 0.4rem;
  padding: 0.25rem;
  margin-right: 0.25rem;
}
.editor .menubar__button svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}
.editor .menubar__button.is-active,
.editor .menubar__button:hover {
  color: #fff;
  background-color: #0d0d0d;
}
.editor .menubar__button.is-disabled {
  color: #d1d5db;
}
.editor .divider {
  width: 2px;
  height: 1.25rem;
  background-color: rgba(0, 0, 0, 0.1);
  margin-left: 0.5rem;
  margin-right: 0.75rem;
}
.editor .bubble-menu {
  display: flex;
  background-color: #374151;
  padding: 0.2rem;
  border-radius: 0.5rem;
}
.editor .bubble-menu button {
  border: none;
  background: none;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0 0.2rem;
  color: #fff;
  opacity: 0.8;
}
.editor .bubble-menu button.is-active,
.editor .bubble-menu button:hover {
  opacity: 1;
}
.ProseMirror {
    padding: 1rem 1rem;
    height: 20rem;
    overflow-y: scroll;
    border: solid 1px #ccc;
    position: relative;

}
/* .ProseMirror:focus {
  outline: none
} */
</style>
