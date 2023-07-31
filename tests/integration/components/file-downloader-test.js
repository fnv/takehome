import { module, test } from 'qunit';
import { setupRenderingTest } from 'ted-nichols-takehome/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | file-downloader', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with none selected', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('model', [
      {
        name: 'smss.exe',
        device: 'Stark',
        path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
        status: 'scheduled',
      },
      {
        name: 'netsh.exe',
        device: 'Targaryen',
        path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe',
        status: 'available',
      },
      {
        name: 'uxtheme.dll',
        device: 'Lannister',
        path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll',
        status: 'available',
      },
      {
        name: 'cryptbase.dll',
        device: 'Martell',
        path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll',
        status: 'scheduled',
      },
      {
        name: '7za.exe',
        device: 'Baratheon',
        path: '\\Device\\HarddiskVolume1\\temp\\7za.exe',
        status: 'scheduled',
      },
    ]);

    await render(hbs`<FileDownloader @files={{this.model}}/>`);

    assert.dom('.selection-text').hasText('None Selected');
  });

  test('clicking select all selects all', async function (assert) {
    this.set('model', [
      {
        name: 'smss.exe',
        device: 'Stark',
        path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
        status: 'scheduled',
      },
      {
        name: 'netsh.exe',
        device: 'Targaryen',
        path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe',
        status: 'available',
      },
      {
        name: 'uxtheme.dll',
        device: 'Lannister',
        path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll',
        status: 'available',
      },
      {
        name: 'cryptbase.dll',
        device: 'Martell',
        path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll',
        status: 'scheduled',
      },
      {
        name: '7za.exe',
        device: 'Baratheon',
        path: '\\Device\\HarddiskVolume1\\temp\\7za.exe',
        status: 'scheduled',
      },
    ]);

    await render(hbs`<FileDownloader @files={{this.model}}/>`);

    assert.dom('.selection-text').hasText('None Selected');

    await click('.select-all');

    assert.dom('.selection-text').hasText('Selected 5');
  });

  test('empty model', async function (assert) {
    this.set('model', []);

    await render(hbs`<FileDownloader @files={{this.model}}/>`);

    assert.dom('.selection-text').hasText('None Selected');

    await click('.select-all');

    assert.dom('.selection-text').hasText('None Selected');
  });

  test('none in list are available', async function (assert) {
    this.set('model', [
      {
        name: 'smss.exe',
        device: 'Stark',
        path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
        status: 'scheduled',
      },
    ]);

    await render(hbs`<FileDownloader @files={{this.model}}/>`);

    assert.dom('.selection-text').hasText('None Selected');

    await click('.select-all');

    assert.dom('.selection-text').hasText('Selected 1');
  });

  test('bad file object', async function (assert) {
    this.set('model', [
      {
        blah: 'cool',
      },
    ]);

    await render(hbs`<FileDownloader @files={{this.model}}/>`);

    assert.dom('.selection-text').hasText('None Selected');
  });
});
