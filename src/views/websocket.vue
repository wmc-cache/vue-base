<template>
	<div>
		<div v-if="isShow">
			<input
				ref="input"
				placeholder="请输入用户名"
			/>
			<input
				ref="roomInput"
				placeholder="房间号"
			/>
			<button @click="enter">进入</button>
		</div>

		<div v-else>
			<input
				ref="messageInput"
				placeholder="..."
			/>
			<button @click="send">发送消息</button>

			<div
				v-for="item in message"
				:key="item"
			>{{ item }}</div>
		</div>
	</div>
</template>

<script lang="ts">
let name;
let roomId;
import { defineComponent, ref } from "vue";
export default defineComponent({
	name: "WebSocket",
	setup() {
		const ws = new WebSocket("ws://localhost:4200");
		const message = ref([]);
		const isShow = ref(true);
		const input = ref();
		const messageInput = ref();
		const roomInput = ref();

		const send = () => {
			ws.send(
				JSON.stringify({
					event: "message",
					message: messageInput.value.value,
					name: name,
				})
			);
		};
		const enter = () => {
			name = input.value.value;
			roomId = roomInput.value.value;
			isShow.value = false;
			ws.send(
				JSON.stringify({
					event: "enter",
					name: name,
					roomId: roomId,
				})
			);
		};
		ws.onopen = function () {
			console.log("onopen");
		};
		ws.onmessage = function (msg) {
			const obj = JSON.parse(msg.data);

			if (obj.event == "enter") {
				message.value.push(`欢迎${obj.name}`);
			} else {
				message.value.push(`${obj.name}:${obj.message}`);
			}
			console.log("asd", message.value);
		};
		ws.onclose = function () {
			console.log("close");
		};

		ws.onerror = function () {
			console.log("error");
		};

		return {
			message,
			isShow,
			enter,
			input,
			messageInput,
			roomInput,
			send,
		};
	},
});
</script>

<style scoped>
input {
	display: block;
}
</style>
