import { mount } from '@vue/test-utils'
import NavBar from '../../../../src/components/shared/nav-bar/NavBar.vue'

describe('Mounted NavBar', () => {
    const wrapper = mount(NavBar);
  
    test('does a wrapper exist', () => {
      expect(wrapper.exists()).toBe(true)
    });
  });
