<template>

	<div id="editor2" type="text/plain" style="width:100%;height:400px;"></div>

</template>

<script>
	import 'static/ueditor/umeditor.config';
	import 'static/ueditor/umeditor.min';
	import 'static/ueditor/lang/zh-cn/zh-cn';
	export default {
		data() {
			return {
				ue: ''
			}
		},
		methods: {

		},
		mounted() {
			this.ue = UM.getEditor('editor2', {
				UEDITOR_HOME_URL: '/static/ueditor/',
			});
		}
	}
</script>