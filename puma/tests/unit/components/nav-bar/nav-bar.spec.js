import {createLocalVue } from '@vue/test-utils'
import CompAPI from '@vue/composition-api'

import NavBar from '../../../../src/components/shared/nav-bar/NavBar.vue'

describe('Mounted NavBar', () => {
    const wrapper = mount(NavBar);
  
    test('does a wrapper exist', () => {
      expect(wrapper.exists()).toBe(true)
    });
  });
