<template>
    <div ref="chatMessages"  class="chat-container">
        <b-card class="chat-box">
            <div class="chat-messages" >
                <template
                    v-if="
                        comments &&
                        comments.data.data &&
                        comments.data.data.length > 0
                    "
                >
                    <div
                        v-for="(comment, index) in comments.data.data"
                        :key="index"
                        class="chat-message"
                        :class="{
                            'own-message': comment.user.id === currentUserId,
                        }"
                    >
                        <b-avatar
                            :text="
                                getInitials(
                                    comment.user.first_name,
                                    comment.user.last_name
                                )
                            "
                            class="avatar"
                        ></b-avatar>
                        <div class="message-content">
                            <span class="message-author">{{
                                comment.user.name
                            }}</span>
                            <p class="message-text">{{ comment.comment }}</p>
                            <span class="message-time">{{
                                comment.created_at
                            }}</span>
                        </div>
                    </div>
                </template>
                <p v-else class="text-muted text-center">No comments yet...</p>
            </div>

            <b-form @submit.prevent="addNewComment" class="chat-input">
                <b-form-input
                    v-model="comments.model"
                    placeholder="Type a message..."
                    class="message-input"
                ></b-form-input>
                <b-button variant="primary" type="submit" class="send-button"
                    >Send</b-button
                >
            </b-form>
        </b-card>
    </div>
</template>

<script>
import { onMounted, ref, watch, nextTick } from "@vue/composition-api";
import { BCard, BButton, BForm, BFormInput, BAvatar } from "bootstrap-vue";
import useTasks from "@/composables/tasks";
import useJwt from "@/auth/jwt/useJwt";

export default {
    components: { BCard, BButton, BForm, BFormInput, BAvatar },
    props: { id: { type: Number, required: true } },
    setup(props) {
        const { comments, getComments, addComment } = useTasks();
        const userData = JSON.parse(useJwt.getUserData());
        const currentUserId = userData.id;
        const chatMessages = ref(null);

        const scrollToBottom = () => {
            nextTick(() => {
                if (chatMessages.value) {
                    chatMessages.value.scrollTop =
                        chatMessages.value.scrollHeight + 100
                  
                }
            });
        };

        onMounted(async () => {
            await getComments(props.id);
            nextTick(scrollToBottom);
        });

        const addNewComment = async () => {
            if (comments.model.trim()) {
                await addComment();
                comments.model = "";
                setTimeout(scrollToBottom, 100);
            }
        };

        // Function to get initials for avatar
        const getInitials = (firstName, lastName) => {
            return `${firstName?.charAt(0) || ""}${
                lastName?.charAt(0) || ""
            }`.toUpperCase();
        };

        return {
            comments,
            chatMessages,
            scrollToBottom,
            addNewComment,
            getInitials,
            currentUserId,
        };
    },
};
</script>

<style scoped>
.chat-container {
    max-width: 600px;
    margin: auto;
    background-color: #fff;
    overflow-x: hidden;
    max-height: 80vh;
    scroll-behavior: smooth;
}
.chat-box {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100%;
    overflow: hidden;
    border-radius: 10px;
    background: transparent;
    box-shadow: none;
}
.chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
}
.chat-message {
    display: flex;
    align-items: flex-end;
    margin-bottom: 10px;
    max-width: 75%;
}
.own-message {
    align-self: flex-end;
    flex-direction: row-reverse;
}
.avatar {
    margin-right: 10px;
}
.own-message .avatar {
    margin-left: 10px;
    margin-right: 0;
}
.message-content {
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
}
.own-message .message-content {
    background-color: #7367f0;
    color: white;
}
.message-author {
    font-weight: bold;
    font-size: 12px;
}
.message-text {
    margin: 5px 0;
}
.message-time {
    font-size: 10px;
    text-align: right;
    opacity: 0.6;
}
.chat-input {
    display: flex;
    border-top: 1px solid #ddd;
    position: fixed;
    bottom: 0px;
    width: 100%;
    left: 0;
    background: white;
    padding: 20px;
}
.message-input {
    flex: 1;
    margin-right: 10px;
}
.send-button {
    white-space: nowrap;
}
</style>
