import './App.css';
import 'antd/dist/antd.css'
import {
    Input,
    Select, Tag
} from 'antd';
import {FileImageOutlined, SearchOutlined} from '@ant-design/icons';
import {useCallback, useState} from "react";

const { Option } = Select;

const Tags = ({tags, handleClose}) => {
    return (
        <>
            <Tag icon={<FileImageOutlined style={{color: 'green'}}/>}>Phones.xlsx</Tag>
            {tags.map((tag, index) => (<Tag
                key={tag + index}
                style={{backgroundColor: 'white'}}
                closable
                onClose={() => handleClose(tag)}>
                {tag}
            </Tag>))}
        </>
    );
};


function App() {
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [widthState, setWidthState] = useState('300px')
    const [inputStatus, setInputStatus] = useState("")

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleClose = useCallback((removedTag) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
    }, [tags]);
    const handleInputConfirm = () => {
        if(inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
            setInputValue('');
            setInputStatus('')
        }if(tags.indexOf(inputValue) !== -1) {
            setInputStatus('error')
        }
    };

    return (
        <div className="App">
            <Input.Group compact className="input-group">
                <Select defaultValue="Sign Up" style={
                    {
                        width: '100px',
                    }
                }>
                    <Option value="Sign Up">Everywhere</Option>
                    <Option value="Sign In">Whole words</Option>
                    <Option value="Sign In">In description</Option>
                  </Select>
                  <Input
                      placeholder="Enter your data"
                      suffix={<SearchOutlined />}
                      style={
                          {
                              width: widthState,
                          }
                      }
                      status={inputStatus}
                      value={inputValue}
                      onChange={handleInputChange}
                      onPressEnter={handleInputConfirm}
                      onFocus={() => setWidthState('500px')}
                      onBlur={() => setWidthState('300px')}
                  />
                  <Tags tags={tags} handleClose={handleClose}/>
              </Input.Group>
        </div>
  );
}

export default App;
