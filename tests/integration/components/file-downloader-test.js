import { module, test } from 'qunit';
import { setupRenderingTest } from 'ted-nichols-takehome/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | file-downloader', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<FileDownloader />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <FileDownloader>
        template block text
      </FileDownloader>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
