/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/simple_contract.json`.
 */
export type SimpleContract = {
  address: 'GA5u51jjph23EiVYE5wNUx1bNgEzo72kd1FVFrqBJPJ9';
  metadata: {
    name: 'simpleContract';
    version: '0.1.0';
    spec: '0.1.0';
    description: 'Created with Anchor';
  };
  instructions: [
    {
      name: 'initialize';
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: 'dataAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [100, 97, 116, 97, 95, 97, 99, 99, 111, 117, 110, 116];
              },
              {
                kind: 'account';
                path: 'user';
              }
            ];
          };
        },
        {
          name: 'user';
          writable: true;
          signer: true;
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'message';
          type: 'string';
        }
      ];
    }
  ];
  accounts: [
    {
      name: 'dataAccount';
      discriminator: [85, 240, 182, 158, 76, 7, 18, 233];
    }
  ];
  types: [
    {
      name: 'dataAccount';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'message';
            type: 'string';
          }
        ];
      };
    }
  ];
};
