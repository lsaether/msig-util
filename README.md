# Multisig CLI Utility

Derive a multisig address.

Usage:

```zsh
npx @w3f/msig-util derive --addresses addr_1,addr_2,... --threshold <num>
```

It also takes an unrequired option to change the ss58 prefix outputted:

```zsh
... --ss58Prefix [0,2,42]
```
