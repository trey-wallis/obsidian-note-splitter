import { App, PluginSettingTab, Setting } from "obsidian";
import NoteSplitterPlugin from "../main";

export default class NoteSplitterSettingsTab extends PluginSettingTab {

	plugin: NoteSplitterPlugin;

	constructor(app: App, plugin: NoteSplitterPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		let { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Folder path")
			.setDesc("The path to the folder that split notes will be placed in")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.saveFolderPath)
					.onChange(async (value) => {
						this.plugin.settings.saveFolderPath = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Delimeter")
			.setDesc("The delimeter to split by")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.delimiter)
					.onChange(async (value) => {
						this.plugin.settings.delimiter = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Use content as title")
			.setDesc("If true, the first sentence will be used as the title of the note, otherwise a timestamp will be used e.g. note-splitter-1702591910")
			.addToggle((text) =>
				text
					.setValue(this.plugin.settings.useContentAsTitle)
					.onChange(async (value) => {
						this.plugin.settings.useContentAsTitle = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
