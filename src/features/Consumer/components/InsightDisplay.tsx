import { Text } from '@mantine/core';
import classes from './InsightDisplay.module.css';

const data = [
  {
    title: 'Pricing',
    stats: '$$',
    description: '$69.42 was the average spend reported by Reviewers',
  },
  {
    title: 'Reviews in the past year',
    stats: '420',
    description: 'created during the 4th year of the Business',
  },
  {
    title: 'Photos and Videos Submitted',
    stats: '69',
    description: '20% of all reviews had media attached',
  },
];

export function InsightDisplay() {
  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </div>
  ));
  return <div className={classes.root}>{stats}</div>;
}