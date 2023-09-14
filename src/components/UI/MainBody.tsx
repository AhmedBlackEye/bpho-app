import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import TaskOne from "../TasksComponents/TaskOne";

import TaskTwoAndThree from "./TaskTwoAndThree";
import TaskSix from "../TasksComponents/TaskSix";
import TaskFive from "../TasksComponents/TaskFive";
import TaskFourOptions from "../TasksComponents/TaskFourOption";
import TaskSevenOptions from "../TasksComponents/TaskSevenOption";

function MainBody() {
  return (
    <div className="px-4 md:px-16">
      <Tabs size="lg">
        <TabList>
          <Tab>Task 1</Tab>
          <Tab>Task 2&3</Tab>
          <Tab>Task 4</Tab>
          <Tab>Task 5</Tab>
          <Tab>Task 6</Tab>
          <Tab>Task 7</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <TaskOne />
          </TabPanel>
          <TabPanel>
            <TaskTwoAndThree />
          </TabPanel>
          <TabPanel>
            <TaskFourOptions />
          </TabPanel>
          <TabPanel>
            <TaskFive />
          </TabPanel>
          <TabPanel>
            <TaskSix />
          </TabPanel>
          <TabPanel>
            <TaskSevenOptions />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default MainBody;
