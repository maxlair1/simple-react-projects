import { useEffect, useState } from 'react';
import './App.css';
import { getItem, setItem } from './localStorage'
import { 
  TextField,
  Button,
  Heading,
  Box,
  Flex,
  Checkbox,
  Container,
  IconButton
} from 'gestalt';

export interface todoItem { 
  name: string;
  isComplete: boolean;
  id: string;
}

function App() {
  const [taskName, setTaskName] = useState<string>('')
  const [items, setItems] = useState<todoItem[]>(() => {
      const task = getItem("tasks")
      return (task as todoItem[]) || undefined
  });

  useEffect(() => {
    setItem("tasks", items)
  }, [items])

  const handleAdd = () => {
    if (taskName.trim() === '') return;
    setItems([
      ...items,
      { name: taskName, isComplete: false, id: crypto.randomUUID() }
    ]);
    setTaskName('');
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleToggle = (id: string) => {
    setItems(
      items.map(item =>
        item.id === id ? { ...item, isComplete: !item.isComplete } : item
      )
    );
  };

  return (
    <>
      <Container>
        <Box padding={2}>
          <Flex
          direction="column"
          gap={{
            row: 0,
            column: 6,
          }}
          maxWidth={800}
          width="100%"
          wrap
        >
          <Heading accessibilityLevel={2} size='600'>Todo List</Heading>
            <Flex
            gap={{
              row: 2,
              column: 0,
            }}
            >
              <TextField
                  id="todo-input"
                  placeholder='Type something...'
                  type="text"
                  onChange={( {value} ) => setTaskName(value)}
                  value={taskName}
              />
              <Button color='red' size='md' text='Add' onClick={()=> handleAdd()}></Button>
            </Flex>
        </Flex>
        </Box>
        <Box padding={2} marginTop={8}>
        {[...items]
          .sort((a, b) => Number(a.isComplete) - Number(b.isComplete))
          .map(task => (
        <Box key={task.id} color="elevationAccent" rounding={3} padding={4} marginBottom={5}>
          <Flex justifyContent='between' alignItems='center'>
            <Flex gap={2}>
          <IconButton
            icon='cancel'
            iconColor='gray'
            accessibilityLabel='Delete item'
            size='sm'
            onClick={() => handleDelete(task.id)}
          />
          <div className={`${task.isComplete && "line-through opacity-50"}`}>
            <Heading size="400">{task.name}</Heading>
          </div>
            </Flex>
            <Checkbox
          id={task.id}
          onChange={() => handleToggle(task.id)}
          checked={task.isComplete}
            />
          </Flex>
        </Box>
          ))}
      </Box>
      </Container>
    </>
  )
}

export default App
