import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
// import { projectBaseURLLink } from '../utils/API';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  company: faker.company.name(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));

// const datafetch = projectBaseURLLink.get((res) => {
//   console.log(res);
// });
// datafetch();
export default users;
