oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g edu
$ edu COMMAND
running command...
$ edu (--version)
edu/0.0.0 darwin-arm64 node-v20.12.2
$ edu --help [COMMAND]
USAGE
  $ edu COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`edu commit`](#edu-commit)
* [`edu hello PERSON`](#edu-hello-person)
* [`edu hello world`](#edu-hello-world)
* [`edu help [COMMAND]`](#edu-help-command)
* [`edu plugins`](#edu-plugins)
* [`edu plugins add PLUGIN`](#edu-plugins-add-plugin)
* [`edu plugins:inspect PLUGIN...`](#edu-pluginsinspect-plugin)
* [`edu plugins install PLUGIN`](#edu-plugins-install-plugin)
* [`edu plugins link PATH`](#edu-plugins-link-path)
* [`edu plugins remove [PLUGIN]`](#edu-plugins-remove-plugin)
* [`edu plugins reset`](#edu-plugins-reset)
* [`edu plugins uninstall [PLUGIN]`](#edu-plugins-uninstall-plugin)
* [`edu plugins unlink [PLUGIN]`](#edu-plugins-unlink-plugin)
* [`edu plugins update`](#edu-plugins-update)

## `edu commit`

Command to generate commits

```
USAGE
  $ edu commit

DESCRIPTION
  Command to generate commits

EXAMPLES
  $ edu commit
```

_See code: [src/commands/commit.ts](https://github.com/EduardoTLopes/edu/blob/v0.0.0/src/commands/commit.ts)_

## `edu hello PERSON`

Say hello

```
USAGE
  $ edu hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/EduardoTLopes/edu/blob/v0.0.0/src/commands/hello/index.ts)_

## `edu hello world`

Say hello world

```
USAGE
  $ edu hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ edu hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/EduardoTLopes/edu/blob/v0.0.0/src/commands/hello/world.ts)_

## `edu help [COMMAND]`

Display help for edu.

```
USAGE
  $ edu help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for edu.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.0.21/src/commands/help.ts)_

## `edu plugins`

List installed plugins.

```
USAGE
  $ edu plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ edu plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.8/src/commands/plugins/index.ts)_

## `edu plugins add PLUGIN`

Installs a plugin into edu.

```
USAGE
  $ edu plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into edu.

  Uses bundled npm executable to install plugins into /Users/eduardolopes/.local/share/edu

  Installation of a user-installed plugin will override a core plugin.

  Use the EDU_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the EDU_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ edu plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ edu plugins add myplugin

  Install a plugin from a github url.

    $ edu plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ edu plugins add someuser/someplugin
```

## `edu plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ edu plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ edu plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.8/src/commands/plugins/inspect.ts)_

## `edu plugins install PLUGIN`

Installs a plugin into edu.

```
USAGE
  $ edu plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into edu.

  Uses bundled npm executable to install plugins into /Users/eduardolopes/.local/share/edu

  Installation of a user-installed plugin will override a core plugin.

  Use the EDU_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the EDU_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ edu plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ edu plugins install myplugin

  Install a plugin from a github url.

    $ edu plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ edu plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.8/src/commands/plugins/install.ts)_

## `edu plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ edu plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ edu plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.8/src/commands/plugins/link.ts)_

## `edu plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ edu plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ edu plugins unlink
  $ edu plugins remove

EXAMPLES
  $ edu plugins remove myplugin
```

## `edu plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ edu plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.8/src/commands/plugins/reset.ts)_

## `edu plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ edu plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ edu plugins unlink
  $ edu plugins remove

EXAMPLES
  $ edu plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.8/src/commands/plugins/uninstall.ts)_

## `edu plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ edu plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ edu plugins unlink
  $ edu plugins remove

EXAMPLES
  $ edu plugins unlink myplugin
```

## `edu plugins update`

Update installed plugins.

```
USAGE
  $ edu plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.8/src/commands/plugins/update.ts)_
<!-- commandsstop -->
