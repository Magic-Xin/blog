// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: magic;
// NCUT-WIFI
// Made by MagicXin
// 调用参数 学号

class Im3xWidget {
	/**
	 * 初始化
	 * @param arg 外部传递过来的参数
	 */
	constructor(arg) {
		this.arg = arg
		this.widgetSize = config.widgetFamily
	}

	//渲染组件
	async render() {
		if (this.arg == "") {
			let w = new ListWidget()
			w.addText("请输入学号")
			return w
		} else if (this.widgetSize === 'medium') {
			return await this.renderSmall()
		} else if (this.widgetSize === 'large') {
			return await this.renderLarge()
		} else {
			return await this.renderSmall()
		}
	}

	//渲染小尺寸组件
	async renderSmall() {
		const widget = new ListWidget();
		let data = await this.getData();

		let header = widget.addStack();
		let icon = header.addImage(await this.getImage('https://blog.magicxin.tech/NCUT.jpg'));
		icon.imageSize = new Size(15, 15);
		header.addSpacer(7.5);
		let title = header.addText(this.arg);
		title.textOpacity = 0.9;
		title.font = Font.systemFont(14);
		title.textColor = new Color("#620062");
		widget.addSpacer(7.5);

		if (data != null) {
			let used_text = widget.addText("已用流量: ");
			used_text.textColor = new Color("#000000");
			used_text.font = Font.boldSystemFont(15);
			used_text.lineLimit = 1;
			widget.addSpacer(5);
			if (data[0] >= 1024.0) {
				data[0] /= 1024;
				let used_data = widget.addText(Number(data[0]).toFixed(2).toString() + " GB");
				used_data.textColor = new Color("#000000");
				used_data.font = Font.systemFont(15);
				used_data.lineLimit = 1;
				used_data.centerAlignText();
			} else {
				let used_data = widget.addText(Number(data[0]).toFixed(2).toString() + " MB");
				used_data.textColor = new Color("#000000");
				used_data.font = Font.systemFont(15);
				used_data.lineLimit = 1;
				used_data.centerAlignText();
			}
			widget.addSpacer(5);

			let left_text = widget.addText("剩余流量: ");
			left_text.textColor = new Color("#000000");
			left_text.font = Font.boldSystemFont(15);
			left_text.lineLimit = 1;
			widget.addSpacer(3);
			if (data[1] >= 1024.0) {
				data[1] /= 1024.0;
				let left_data = widget.addText(Number(data[1]).toFixed(2).toString() + " GB");
				left_data.textColor = new Color("#000000");
				left_data.font = Font.systemFont(15);
				left_data.lineLimit = 1;
				left_data.centerAlignText();
			} else {
				let left_data = widget.addText(Number(data[1]).toFixed(2).toString() + " MB");
				left_data.textColor = new Color("#000000");
				left_data.font = Font.systemFont(15);
				left_data.lineLimit = 1;
				left_data.centerAlignText();
			}
			widget.addSpacer(5);

			let date_data = widget.addText('更新于:' + this.nowDate());
			date_data.font = Font.systemFont(10);
			date_data.textColor = new Color("#000000");
			date_data.centerAlignText();

			let date_time = widget.addText(this.nowTime());
			date_time.font = Font.systemFont(10);
			date_time.textColor = new Color("#000000");
			date_time.centerAlignText();
		}

		widget.backgroundColor = new Color("#FFFFFF");

		let nextRefresh = Date.now() + 1800000;
		widget.refreshAfterDate = new Date(nextRefresh);
		return widget;
	}

	//渲染中尺寸组件
	async renderMedium() {
		let w = new ListWidget()
		w.addText("暂不支持该尺寸组件")
		return w
	}

	//渲染大尺寸组件
	async renderLarge() {
		let w = new ListWidget()
		w.addText("暂不支持该尺寸组件")
		return w
	}

	//加载数据
	async getData() {
		let account = this.arg;
		let url = 'http://192.168.254.251:801/eportal/?c=ServiceInterface&a=loadUserInfo&callback=jQuery111305347245247052315_1603940434479&account=' + account + '&_=1603940434480';
		let req = new Request(url);
		let res = await req.loadString();
		let data = res.match(/([1-9]\d*\.\d*)|(0\.\d*[1-9])/g);
		return data;
	}

	//加载远程图片
	async getImage(url) {
		let req = new Request(url)
		return await req.loadImage()
	}

	nowDate() {
		let date = new Date();
		return date.toLocaleDateString('chinese', {
			hour12: false
		});
	}

	nowTime() {
		let date = new Date();
		return date.toLocaleTimeString('chinese', {
			hour12: false
		});
	}


	//编辑测试使用
	async test() {
		if (config.runsInWidget) return
		this.widgetSize = 'small'
		let w1 = await this.render()
		await w1.presentSmall()
		this.widgetSize = 'medium'
		let w2 = await this.render()
		await w2.presentMedium()
		this.widgetSize = 'large'
		let w3 = await this.render()
		await w3.presentLarge()
	}

	//组件单独在桌面运行时调用
	async init() {
		if (!config.runsInWidget) return
		let widget = await this.render()
		Script.setWidget(widget)
		Script.complete()
	}
}

module.exports = Im3xWidget

// 如果是在编辑器内编辑、运行、测试，则取消注释这行，便于调试：
//await new Im3xWidget().test()

// 如果是组件单独使用（桌面配置选择这个组件使用，则取消注释这一行：
await new Im3xWidget(args.widgetParameter).init()