import { Icon, Input, Tag, Tooltip } from "antd";
import { observer } from "mobx-react";
import React from "react";

interface IQuestionTypeTagsState {
    tags: string[];
    inputVisible: boolean;
    inputValue: string;
    editInputIndex: number;
    editInputValue: string;
}

interface IQuestionTypeTags {
    tags?: string;
    onChange?: (value: string) => void;
}

@observer
export class QuestionTypeTags extends React.Component<IQuestionTypeTags, IQuestionTypeTagsState> {
    public input: any;
    public editInput: any;

    constructor(props: IQuestionTypeTags) {
        super(props)
        this.state = {
            /** 拆 */
            tags: this.props.tags?.split('，') || [],
            inputVisible: false,
            inputValue: '',
            editInputIndex: -1,
            editInputValue: '',
        };
    }


    public handleClose = (removedTag: any) => {
        const tags = this.state.tags.filter((tag: any) => tag !== removedTag);
        const tagsj = tags.join('，'); 
        console.log("tags", tags);
        /** 将['水质', '热门'] 转换为 "水质，热门" */
        this.props.onChange!(tagsj);
        this.setState({ tags });
    };

    public showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    public handleInputChange = (e: { target: { value: any; }; }) => {
        this.setState({ inputValue: e.target.value });
    };

    public handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        console.log("tags组件内，satte",tags);

        const tagsj = tags.join('，'); 
        this.props.onChange!(tagsj)
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    };

    public handleEditInputChange = (e: { target: { value: any; }; }) => {
        this.setState({ editInputValue: e.target.value });
    };

    public handleEditInputConfirm = () => {
        const newTags = [...this.state.tags];
        newTags[this.state.editInputIndex] = this.state.editInputValue;
        this.setState({
            tags: newTags,
            editInputIndex: -1,
            editInputValue: '',
        })

    };

    public saveInputRef = (input: any) => {
        this.input = input;
    };

    public saveEditInputRef = (input: any) => {
        this.editInput = input;
    };

    public render() {
        const {  inputVisible, inputValue, editInputIndex, editInputValue } = this.state;
        return (
            <>
                {this.state.tags?.map((tag: string, index: number) => {
                    if (editInputIndex === index) {
                        return (
                            <Input
                                ref={this.saveEditInputRef}
                                key={tag}
                                size="small"
                                className="tag-input"
                                value={editInputValue}
                                onChange={this.handleEditInputChange}
                                onBlur={this.handleEditInputConfirm}
                                onPressEnter={this.handleEditInputConfirm}
                            />
                        );
                    }

                    const isLongTag = tag.length > 20;

                    const tagElem = (
                        <Tag
                            className="edit-tag"
                            key={tag}
                            closable={true}
                            onClose={() => this.handleClose(tag)}
                        >
                            <span
                                onDoubleClick={e => {
                                    if (index !== -1) {
                                        this.setState({ editInputIndex: index, editInputValue: tag }, () => {
                                            this.editInput.focus();
                                        });
                                        e.preventDefault();
                                    }
                                }}
                            >
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </span>
                        </Tag>
                    );
                    return isLongTag ? (
                        <Tooltip title={tag} key={tag}>
                            {tagElem}
                        </Tooltip>
                    ) : (
                        tagElem
                    );
                })}
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        className="tag-input"
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag className="site-tag-plus" onClick={this.showInput}>
                        <Icon type="plus" style={{ color: "blue" }} />
                    </Tag>
                )}
            </>
        );
    }
}