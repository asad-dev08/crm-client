import  {Button, Typography} from 'antd'
import './App.css';
import ThemeProvider from './components/theme/ThemeProvider';
import Settings from './components/theme/settings/Settings';
import toast, { Toaster } from 'react-hot-toast';

const {Paragraph, Text} = Typography

function App() {
  const notify = () => toast.success('Here is your toast.', {duration:3000});

  return (
   <ThemeProvider>
    <Typography.Title level={5}>Hello CRM</Typography.Title>
          <Button type='primary' onClick={notify}>Make me a toast</Button>

    <Settings />
    <Toaster />
   </ThemeProvider>
  );
}

export default App;
