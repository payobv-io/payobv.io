/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/payobvio_solana_program.json`.
 */
export type PayobvioSolanaProgram = {
  address: '7HY2CZNoay1mCNTKQNzM7RUDQo6hmMchBZLHL4qKoDvQ';
  metadata: {
    name: 'payobvioSolanaProgram';
    version: '0.1.0';
    spec: '0.1.0';
    description: 'Created with Anchor';
  };
  instructions: [
    {
      name: 'closeEscrow';
      discriminator: [139, 171, 94, 146, 191, 91, 144, 50];
      accounts: [
        {
          name: 'maintainer';
          writable: true;
          signer: true;
        },
        {
          name: 'escrowAccount';
          writable: true;
        }
      ];
      args: [];
    },
    {
      name: 'depositFunds';
      discriminator: [202, 39, 52, 211, 53, 20, 250, 88];
      accounts: [
        {
          name: 'maintainer';
          writable: true;
          signer: true;
        },
        {
          name: 'escrowAccount';
          writable: true;
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'amount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'initializeEscrow';
      discriminator: [243, 160, 77, 153, 11, 92, 48, 209];
      accounts: [
        {
          name: 'maintainer';
          writable: true;
          signer: true;
        },
        {
          name: 'escrowAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [101, 115, 99, 114, 111, 119];
              },
              {
                kind: 'arg';
                path: 'issueId';
              }
            ];
          };
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'bountyAmount';
          type: 'u64';
        },
        {
          name: 'issueId';
          type: 'string';
        }
      ];
    },
    {
      name: 'refund';
      discriminator: [2, 96, 183, 251, 63, 208, 46, 46];
      accounts: [
        {
          name: 'maintainer';
          writable: true;
          signer: true;
        },
        {
          name: 'escrowAccount';
          writable: true;
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [];
    },
    {
      name: 'releaseFunds';
      discriminator: [225, 88, 91, 108, 126, 52, 2, 26];
      accounts: [
        {
          name: 'maintainer';
          writable: true;
          signer: true;
        },
        {
          name: 'contributor';
          writable: true;
        },
        {
          name: 'escrowAccount';
          writable: true;
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: 'escrowAccount';
      discriminator: [36, 69, 48, 18, 128, 225, 125, 135];
    }
  ];
  errors: [
    {
      code: 6000;
      name: 'invalidEscrowState';
      msg: 'The escrow is not in the correct state for this operation';
    },
    {
      code: 6001;
      name: 'invalidDepositAmount';
      msg: 'The deposit amount does not match the bounty amount';
    }
  ];
  types: [
    {
      name: 'escrowAccount';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'maintainer';
            type: 'pubkey';
          },
          {
            name: 'amount';
            type: 'u64';
          },
          {
            name: 'issueId';
            type: 'string';
          },
          {
            name: 'state';
            type: {
              defined: {
                name: 'escrowState';
              };
            };
          }
        ];
      };
    },
    {
      name: 'escrowState';
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'initialized';
          },
          {
            name: 'funded';
          },
          {
            name: 'completed';
          },
          {
            name: 'refunded';
          }
        ];
      };
    }
  ];
};
