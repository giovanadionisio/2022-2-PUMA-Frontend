import { createLocalVue, shallowMount } from '@vue/test-utils';
import CompAPI from '@vue/composition-api';

import NavBar from '../../../../src/components/shared/nav-bar/NavBar.vue';

describe('Mounted NavBar', () => {
  const wrapper = shallowMount(NavBar, {
    propsData : {
      title   : 'title',
      subtitle: 'subtitle',
      username: 'username'
    },
  });

  it('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('does the title is shows as the value', () => {
    expect(wrapper.find('.title').text()).toEqual('title')
  });
  it('does the sub-title is shows as the value', () => {
    expect(wrapper.find('.sub-title').text()).toEqual('subtitle')
  });
  it('does the user is shows as the value', () => {
    expect(wrapper.find('.user').text()).toEqual('username')
  });
});
