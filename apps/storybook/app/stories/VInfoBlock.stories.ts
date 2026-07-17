import type { Meta, StoryObj, } from '@storybook/vue3-vite';
import { VInfoBlock, VInfoRow } from '@client/ui-vue';

type InfoBlockStoryArgs = {
    rows: Array<{
        label: string;
        content: string;
    }>;
};

const meta: Meta<InfoBlockStoryArgs> = {
    title: 'UIKit/InfoBlock',
    component: VInfoBlock,

    render: args =>
    {
        return {
            components: { VInfoBlock, VInfoRow },
            setup()
            {
                return args;
            },

            template: `<VInfoBlock>
                <VInfoRow v-for="row of rows" v-bind="row" />
            </VInfoBlock>`,
        };
    }
};

export default meta;
type Story = StoryObj<InfoBlockStoryArgs>;

export const Default: Story = {
    args: {
        rows: [
            { label: 'Выполнить до', content: '31.12.2026, 03:00' },
            { label: 'Выполнено', content: '01.05.2026, 03:00' },
        ]
    }
};

export const SingleRow: Story = {
    args: {
        rows: [
            { label: 'Выполнить до', content: '31.12.2026, 03:00' },
        ]
    }
};

export const Empty: Story = {
    args: {
        rows: []
    }
};

export const LongContent: Story = {
    args: {
        rows: [
            { label: 'Description', content: 'This is a very long description that might span multiple lines and test the layout of the info block. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { label: 'Short', content: 'Short content' },
        ]
    }
};

export const MixedEmptyRows: Story = {
    args: {
        rows: [
            { label: 'Label 1', content: 'Content 1' },
            { label: 'Label 2', content: '' }, // Empty content row should be hidden
            { label: 'Label 3', content: 'Content 3' },
            { label: '', content: 'Content without label' },
        ]
    }
};

export const ManyRows: Story = {
    args: {
        rows: [
            { label: 'ID', content: '12345' },
            { label: 'Name', content: 'Project Alpha' },
            { label: 'Status', content: 'In Progress' },
            { label: 'Priority', content: 'High' },
            { label: 'Assignee', content: 'Jane Smith' },
            { label: 'Due Date', content: '2026-12-31' },
            { label: 'Created', content: '2026-01-15' },
            { label: 'Updated', content: '2026-04-30' },
            { label: 'Category', content: 'Development' },
            { label: 'Tags', content: 'urgent, backend, api' },
        ]
    }
};