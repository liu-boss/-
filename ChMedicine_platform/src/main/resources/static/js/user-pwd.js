layui.use(['form', 'layer', 'okLayer', 'okUtils'], function () {
	var form = layui.form,
		layer = layui.layer,
		$ = layui.jquery,
		$form = $('form');
	let okUtils = layui.okUtils;
	let okLayer = layui.okLayer;
	okLoading.close();
	//添加验证规则verify
	form.verify({
		pass: [
			/^[\S]{6,16}$/
			, '密码必须6到16位，且不能出现空格'
		],
		confirmPwd: function (value, item) {
			if (!new RegExp($("#oldPwd").val()).test(value)) {
				return "两次输入密码不一致，请重新输入！";
			}
		},

	});

	//修改密码
	form.on("submit(changePwd)", function (data) {
		var index = layer.msg('提交中，请稍候', {icon: 16, time: false, shade: 0.8});
		setTimeout(function () {
			okUtils.ajax("/updateuserinfo", "post", data.field, true).done(function (response) {
				layer.close(index);
				layer.msg(response.msg);
				okLayer.greenTickMsg(response.msg, function () {
					window.location = "/index";
				})
			}).fail(function (error) {
				console.log(error)
			})
		}, 2000);
		return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
	})

});

