import type { Meta, StoryObj } from '@nuxtjs/storybook';
import VToDoCard from '@todo/components/VToDoCard.vue';
import { fn } from "storybook/test";

const meta: Meta<typeof VToDoCard> = {
  title    : 'Components/VToDoCard',
  component: VToDoCard,

  args: {
    'onEdit-button-click': fn(),
  },

  argTypes: {
    title: {
      type   : 'string',
      control: 'text'
    },

    description: {
      type   : 'string',
      control: 'text'
    },

    completionDatePlanned: {
      type   : 'string',
      control: 'text'
    },

    completionDateActual: {
      type   : 'string',
      control: 'text'
    }
  },
}

export default meta;
type Story = StoryObj<typeof VToDoCard>;

export const Default: Story = {
  args: {
    title      : 'Задача 1',
    description: 'Описание задачи',
  }
};

export const Planned: Story = {
  args: {
    title                : 'Запланированная задача',
    description          : 'Описание задачи',
    completionDatePlanned: '01.12.2023, 15:31'
  }
};

export const Completed: Story = {
  args: {
    title                : 'Завершенная задача',
    description          : 'Описание завершенной задачи',
    completionDatePlanned: '01.11.2023, 12:17',
    completionDateActual : '05.11.2023, 09:03'
  }
};