export const code =
    [{
        "prim": "parameter",
        "args":
            [{
                "prim": "or",
                "args":
                    [{
                        "prim": "or",
                        "args":
                            [{
                                "prim": "or",
                                "args":
                                    [{
                                        "prim": "address",
                                        "annots": ["%addAdmin"]
                                    },
                                    {
                                        "prim": "map",
                                        "args":
                                            [{ "prim": "address" },
                                            { "prim": "nat" }],
                                        "annots": ["%addVoters"]
                                    }]
                            },
                            {
                                "prim": "or",
                                "args":
                                    [{
                                        "prim": "string",
                                        "annots": ["%init"]
                                    },
                                    {
                                        "prim": "address",
                                        "annots": ["%removeAdmin"]
                                    }]
                            }]
                    },
                    {
                        "prim": "or",
                        "args":
                            [{
                                "prim": "int",
                                "annots": ["%startVote"]
                            },
                            {
                                "prim": "nat",
                                "annots": ["%vote"]
                            }]
                    }]
            }]
    },
    {
        "prim": "storage",
        "args":
            [{
                "prim": "pair",
                "args":
                    [{
                        "prim": "pair",
                        "args":
                            [{
                                "prim": "pair",
                                "args":
                                    [{
                                        "prim": "set",
                                        "args":
                                            [{ "prim": "address" }],
                                        "annots": ["%admins"]
                                    },
                                    {
                                        "prim": "timestamp",
                                        "annots": ["%enddate"]
                                    }]
                            },
                            {
                                "prim": "pair",
                                "args":
                                    [{
                                        "prim": "string",
                                        "annots": ["%proposal"]
                                    },
                                    {
                                        "prim": "map",
                                        "args":
                                            [{ "prim": "address" },
                                            { "prim": "nat" }],
                                        "annots": ["%voters"]
                                    }]
                            }]
                    },
                    {
                        "prim": "map",
                        "args":
                            [{ "prim": "nat" }, { "prim": "nat" }],
                        "annots": ["%votes"]
                    }]
            }]
    },
    {
        "prim": "code",
        "args":
            [[{
                "prim": "LAMBDA",
                "args":
                    [{
                        "prim": "set",
                        "args": [{ "prim": "address" }]
                    },
                    { "prim": "unit" },
                    [{ "prim": "DUP" }, { "prim": "SENDER" },
                    { "prim": "MEM" }, { "prim": "NOT" },
                    {
                        "prim": "IF",
                        "args":
                            [[{
                                "prim": "PUSH",
                                "args":
                                    [{ "prim": "string" },
                                    {
                                        "string":
                                            "You don't have this privilege."
                                    }]
                            },
                            { "prim": "FAILWITH" }],
                            [{
                                "prim": "PUSH",
                                "args":
                                    [{ "prim": "unit" },
                                    { "prim": "Unit" }]
                            }]]
                    },
                    {
                        "prim": "DROP",
                        "args": [{ "int": "2" }]
                    },
                    { "prim": "UNIT" }]]
            },
            {
                "prim": "LAMBDA",
                "args":
                    [{ "prim": "timestamp" },
                    { "prim": "unit" },
                    [{ "prim": "DUP" }, { "prim": "NOW" },
                    { "prim": "COMPARE" }, { "prim": "LT" },
                    {
                        "prim": "IF",
                        "args":
                            [[{
                                "prim": "PUSH",
                                "args":
                                    [{ "prim": "string" },
                                    {
                                        "string":
                                            "The vote is still ongoing."
                                    }]
                            },
                            { "prim": "FAILWITH" }],
                            [{
                                "prim": "PUSH",
                                "args":
                                    [{ "prim": "unit" },
                                    { "prim": "Unit" }]
                            }]]
                    },
                    {
                        "prim": "DROP",
                        "args": [{ "int": "2" }]
                    },
                    {
                        "prim": "PUSH",
                        "args":
                            [{ "prim": "unit" },
                            { "prim": "Unit" }]
                    }]]
            },
            {
                "prim": "DIP",
                "args":
                    [{ "int": "2" }, [{ "prim": "DUP" }]]
            },
            { "prim": "DIG", "args": [{ "int": "2" }] },
            { "prim": "CDR" },
            {
                "prim": "DIP",
                "args":
                    [{ "int": "3" }, [{ "prim": "DUP" }]]
            },
            { "prim": "DIG", "args": [{ "int": "3" }] },
            { "prim": "CAR" },
            {
                "prim": "IF_LEFT",
                "args":
                    [[{ "prim": "DUP" },
                    {
                        "prim": "IF_LEFT",
                        "args":
                            [[{ "prim": "DUP" },
                            {
                                "prim": "IF_LEFT",
                                "args":
                                    [[{ "prim": "DUP" },
                                    {
                                        "prim": "DIP",
                                        "args":
                                            [{ "int": "4" },
                                            [{ "prim": "DUP" }]]
                                    },
                                    {
                                        "prim": "DIG",
                                        "args":
                                            [{ "int": "4" }]
                                    },
                                    { "prim": "CAR" },
                                    { "prim": "CAR" },
                                    { "prim": "CAR" },
                                    {
                                        "prim": "DIP",
                                        "args":
                                            [[{
                                                "prim": "DIP",
                                                "args":
                                                    [{
                                                        "int":
                                                            "6"
                                                    },
                                                    [{
                                                        "prim":
                                                            "DUP"
                                                    }]]
                                            },
                                            {
                                                "prim": "DIG",
                                                "args":
                                                    [{
                                                        "int":
                                                            "6"
                                                    }]
                                            }]]
                                    },
                                    { "prim": "EXEC" },
                                    { "prim": "DROP" },
                                    { "prim": "DUP" },
                                    {
                                        "prim": "DIP",
                                        "args":
                                            [[{
                                                "prim": "DIP",
                                                "args":
                                                    [{
                                                        "int":
                                                            "4"
                                                    },
                                                    [{
                                                        "prim":
                                                            "DUP"
                                                    }]]
                                            },
                                            {
                                                "prim": "DIG",
                                                "args":
                                                    [{
                                                        "int":
                                                            "4"
                                                    }]
                                            },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            {
                                                "prim": "PUSH",
                                                "args":
                                                    [{
                                                        "prim":
                                                            "bool"
                                                    },
                                                    {
                                                        "prim":
                                                            "True"
                                                    }]
                                            }]]
                                    },
                                    { "prim": "UPDATE" },
                                    {
                                        "prim": "DIP",
                                        "args":
                                            [[{
                                                "prim": "DIP",
                                                "args":
                                                    [{
                                                        "int":
                                                            "4"
                                                    },
                                                    [{
                                                        "prim":
                                                            "DUP"
                                                    }]]
                                            },
                                            {
                                                "prim": "DIG",
                                                "args":
                                                    [{
                                                        "int":
                                                            "4"
                                                    }]
                                            },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CAR" },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" }]]
                                    },
                                    { "prim": "PAIR" },
                                    { "prim": "PAIR" },
                                    { "prim": "PAIR" },
                                    {
                                        "prim": "DIP",
                                        "args":
                                            [{ "int": "5" },
                                            [{ "prim": "DROP" }]]
                                    },
                                    {
                                        "prim": "DUG",
                                        "args":
                                            [{ "int": "4" }]
                                    },
                                    {
                                        "prim": "DROP",
                                        "args":
                                            [{ "int": "2" }]
                                    },
                                    {
                                        "prim": "PUSH",
                                        "args":
                                            [{ "prim": "unit" },
                                            { "prim": "Unit" }]
                                    }],
                                    [{ "prim": "DUP" },
                                    { "prim": "DUP" },
                                    {
                                        "prim": "ITER",
                                        "args":
                                            [[{ "prim": "DUP" },
                                            { "prim": "CAR" },
                                            {
                                                "prim": "DIP",
                                                "args":
                                                    [[{
                                                        "prim":
                                                            "DUP"
                                                    }]]
                                            },
                                            { "prim": "SWAP" },
                                            { "prim": "CDR" },
                                            {
                                                "prim": "DIP",
                                                "args":
                                                    [[{
                                                        "prim":
                                                            "DUP"
                                                    }]]
                                            },
                                            { "prim": "SWAP" },
                                            {
                                                "prim": "DIP",
                                                "args":
                                                    [[{
                                                        "prim":
                                                            "DUP"
                                                    },
                                                    {
                                                        "prim":
                                                            "SOME"
                                                    },
                                                    {
                                                        "prim":
                                                            "DIP",
                                                        "args":
                                                            [[{
                                                                "prim":
                                                                    "DIP",
                                                                "args":
                                                                    [{
                                                                        "int":
                                                                            "7"
                                                                    },
                                                                    [{
                                                                        "prim":
                                                                            "DUP"
                                                                    }]]
                                                            },
                                                            {
                                                                "prim":
                                                                    "DIG",
                                                                "args":
                                                                    [{
                                                                        "int":
                                                                            "7"
                                                                    }]
                                                            },
                                                            {
                                                                "prim":
                                                                    "CAR"
                                                            },
                                                            {
                                                                "prim":
                                                                    "CDR"
                                                            },
                                                            {
                                                                "prim":
                                                                    "CDR"
                                                            }]]
                                                    }]]
                                            },
                                            {
                                                "prim":
                                                    "UPDATE"
                                            },
                                            {
                                                "prim": "DIP",
                                                "args":
                                                    [[{
                                                        "prim":
                                                            "DIP",
                                                        "args":
                                                            [{
                                                                "int":
                                                                    "7"
                                                            },
                                                            [{
                                                                "prim":
                                                                    "DUP"
                                                            }]]
                                                    },
                                                    {
                                                        "prim":
                                                            "DIG",
                                                        "args":
                                                            [{
                                                                "int":
                                                                    "7"
                                                            }]
                                                    },
                                                    {
                                                        "prim":
                                                            "DUP"
                                                    },
                                                    {
                                                        "prim":
                                                            "CDR"
                                                    },
                                                    {
                                                        "prim":
                                                            "SWAP"
                                                    },
                                                    {
                                                        "prim":
                                                            "CAR"
                                                    },
                                                    {
                                                        "prim":
                                                            "DUP"
                                                    },
                                                    {
                                                        "prim":
                                                            "CAR"
                                                    },
                                                    {
                                                        "prim":
                                                            "SWAP"
                                                    },
                                                    {
                                                        "prim":
                                                            "CDR"
                                                    },
                                                    {
                                                        "prim":
                                                            "CAR"
                                                    }]]
                                            },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "SWAP" },
                                            { "prim": "PAIR" },
                                            { "prim": "PAIR" },
                                            {
                                                "prim": "DIP",
                                                "args":
                                                    [{
                                                        "int":
                                                            "8"
                                                    },
                                                    [{
                                                        "prim":
                                                            "DROP"
                                                    }]]
                                            },
                                            {
                                                "prim": "DUG",
                                                "args":
                                                    [{
                                                        "int":
                                                            "7"
                                                    }]
                                            },
                                            {
                                                "prim": "DROP",
                                                "args":
                                                    [{
                                                        "int":
                                                            "3"
                                                    }]
                                            }]]
                                    },
                                    {
                                        "prim": "DROP",
                                        "args":
                                            [{ "int": "2" }]
                                    },
                                    {
                                        "prim": "PUSH",
                                        "args":
                                            [{ "prim": "unit" },
                                            { "prim": "Unit" }]
                                    }]]
                            },
                            {
                                "prim": "DIP",
                                "args":
                                    [[{ "prim": "DROP" }]]
                            }],
                            [{ "prim": "DUP" },
                            {
                                "prim": "IF_LEFT",
                                "args":
                                    [[{ "prim": "DUP" },
                                    {
                                        "prim": "DIP",
                                        "args":
                                            [{ "int": "4" },
                                            [{ "prim": "DUP" }]]
                                    },
                                    {
                                        "prim": "DIG",
                                        "args":
                                            [{ "int": "4" }]
                                    },
                                    { "prim": "CAR" },
                                    { "prim": "CAR" },
                                    { "prim": "CAR" },
                                    {
                                        "prim": "DIP",
                                        "args":
                                            [[{
                                                "prim": "DIP",
                                                "args":
                                                    [{
                                                        "int":
                                                            "6"
                                                    },
                                                    [{
                                                        "prim":
                                                            "DUP"
                                                    }]]
                                            },
                                            {
                                                "prim": "DIG",
                                                "args":
                                                    [{
                                                        "int":
                                                            "6"
                                                    }]
                                            }]]
                                    },
                                    { "prim": "EXEC" },
                                    { "prim": "DROP" },
                                    {
                                        "prim": "DIP",
                                        "args":
                                            [{ "int": "4" },
                                            [{ "prim": "DUP" }]]
                                    },
                                    {
                                        "prim": "DIG",
                                        "args":
                                            [{ "int": "4" }]
                                    },
                                    { "prim": "CAR" },
                                    { "prim": "CAR" },
                                    { "prim": "CDR" },
                                    {
                                        "prim": "DIP",
                                        "args":
                                            [[{
                                                "prim": "DIP",
                                                "args":
                                                    [{
                                                        "int":
                                                            "5"
                                                    },
                                                    [{
                                                        "prim":
                                                            "DUP"
                                                    }]]
                                            },
                                            {
                                                "prim": "DIG",
                                                "args":
                                                    [{
                                                        "int":
                                                            "5"
                                                    }]
                                            }]]
                                    },
                                    { "prim": "EXEC" },
                                    { "prim": "DROP" },
                                    {
                                        "prim": "DIP",
                                        "args":
                                            [{ "int": "4" },
                                            [{ "prim": "DUP" }]]
                                    },
                                    {
                                        "prim": "DIG",
                                        "args":
                                            [{ "int": "4" }]
                                    },
                                    { "prim": "DUP" },
                                    { "prim": "CDR" },
                                    { "prim": "SWAP" },
                                    { "prim": "CAR" },
                                    { "prim": "DUP" },
                                    { "prim": "CAR" },
                                    { "prim": "SWAP" },
                                    { "prim": "CDR" },
                                    { "prim": "CAR" },
                                    {
                                        "prim": "EMPTY_MAP",
                                        "args":
                                            [{ "prim": "address" },
                                            { "prim": "nat" }]
                                    },
                                    { "prim": "SWAP" },
                                    { "prim": "PAIR" },
                                    { "prim": "SWAP" },
                                    { "prim": "PAIR" },
                                    { "prim": "PAIR" },
                                    {
                                        "prim": "DIP",
                                        "args":
                                            [{ "int": "5" },
                                            [{ "prim": "DROP" }]]
                                    },
                                    {
                                        "prim": "DUG",
                                        "args":
                                            [{ "int": "4" }]
                                    },
                                    { "prim": "DUP" },
                                    {
                                        "prim": "DIP",
                                        "args":
                                            [[{
                                                "prim": "DIP",
                                                "args":
                                                    [{
                                                        "int":
                                                            "4"
                                                    },
                                                    [{
                                                        "prim":
                                                            "DUP"
                                                    }]]
                                            },
                                            {
                                                "prim": "DIG",
                                                "args":
                                                    [{
                                                        "int":
                                                            "4"
                                                    }]
                                            },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CAR" },
                                            { "prim": "DUP" },
                                            { "prim": "CAR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CDR" },
                                            { "prim": "CDR" }]]
                                    },
                                    { "prim": "PAIR" },
                                    { "prim": "SWAP" },
                                    { "prim": "PAIR" },
                                    { "prim": "PAIR" },
                                    {
                                        "prim": "DIP",
                                        "args":
                                            [{ "int": "5" },
                                            [{ "prim": "DROP" }]]
                                    },
                                    {
                                        "prim": "DUG",
                                        "args":
                                            [{ "int": "4" }]
                                    },
                                    {
                                        "prim": "PUSH",
                                        "args":
                                            [{ "prim": "nat" },
                                            { "int": "0" }]
                                    },
                                    { "prim": "SOME" },
                                    {
                                        "prim": "DIP",
                                        "args":
                                            [[{
                                                "prim": "PUSH",
                                                "args":
                                                    [{
                                                        "prim":
                                                            "nat"
                                                    },
                                                    {
                                                        "int":
                                                            "0"
                                                    }]
                                            },
                                            { "prim": "SOME" },
                                            {
                                                "prim": "DIP",
                                                "args":
                                                    [[{
                                                        "prim":
                                                            "PUSH",
                                                        "args":
                                                            [{
                                                                "prim":
                                                                    "nat"
                                                            },
                                                            {
                                                                "int":
                                                                    "0"
                                                            }]
                                                    },
                                                    {
                                                        "prim":
                                                            "SOME"
                                                    },
                                                    {
                                                        "prim":
                                                            "EMPTY_MAP",
                                                        "args":
                                                            [{
                                                                "prim":
                                                                    "nat"
                                                            },
                                                            {
                                                                "prim":
                                                                    "nat"
                                                            }]
                                                    },
                                                    {
                                                        "prim":
                                                            "SWAP"
                                                    },
                                                    {
                                                        "prim":
                                                            "PUSH",
                                                        "args":
                                                            [{
                                                                "prim":
                                                                    "nat"
                                                            },
                                                            {
                                                                "int":
                                                                    "1"
                                                            }]
                                                    },
                                                    {
                                                        "prim":
                                                            "UPDATE"
                                                    }]]
                                            },
                                            {
                                                "prim": "PUSH",
                                                "args":
                                                    [{
                                                        "prim":
                                                            "nat"
                                                    },
                                                    {
                                                        "int":
                                                            "2"
                                                    }]
                                            },
                                            {
                                                "prim":
                                                    "UPDATE"
                                            }]]
                                    },
                                    {
                                        "prim": "PUSH",
                                        "args":
                                            [{ "prim": "nat" },
                                            { "int": "3" }]
                                    },
                                    { "prim": "UPDATE" },
                                    {
                                        "prim": "DIP",
                                        "args":
                                            [[{
                                                "prim": "DIP",
                                                "args":
                                                    [{
                                                        "int":
                                                            "4"
                                                    },
                                                    [{
                                                        "prim":
                                                            "DUP"
                                                    }]]
                                            },
                                            {
                                                "prim": "DIG",
                                                "args":
                                                    [{
                                                        "int":
                                                            "4"
                                                    }]
                                            },
                                            { "prim": "CAR" }]]
                                    },
                                    { "prim": "SWAP" },
                                    { "prim": "PAIR" },
                                    {
                                        "prim": "DIP",
                                        "args":
                                            [{ "int": "5" },
                                            [{ "prim": "DROP" }]]
                                    },
                                    {
                                        "prim": "DUG",
                                        "args":
                                            [{ "int": "4" }]
                                    },
                                    {
                                        "prim": "DROP",
                                        "args":
                                            [{ "int": "2" }]
                                    },
                                    {
                                        "prim": "PUSH",
                                        "args":
                                            [{ "prim": "unit" },
                                            { "prim": "Unit" }]
                                    }],
                                    [{ "prim": "DUP" },
                                    {
                                        "prim": "DIP",
                                        "args":
                                            [{ "int": "4" },
                                            [{ "prim": "DUP" }]]
                                    },
                                    {
                                        "prim": "DIG",
                                        "args":
                                            [{ "int": "4" }]
                                    },
                                    { "prim": "CAR" },
                                    { "prim": "CAR" },
                                    { "prim": "CAR" },
                                    {
                                        "prim": "DIP",
                                        "args":
                                            [[{
                                                "prim": "DIP",
                                                "args":
                                                    [{
                                                        "int":
                                                            "6"
                                                    },
                                                    [{
                                                        "prim":
                                                            "DUP"
                                                    }]]
                                            },
                                            {
                                                "prim": "DIG",
                                                "args":
                                                    [{
                                                        "int":
                                                            "6"
                                                    }]
                                            }]]
                                    },
                                    { "prim": "EXEC" },
                                    { "prim": "DROP" },
                                    { "prim": "DUP" },
                                    {
                                        "prim": "DIP",
                                        "args":
                                            [[{
                                                "prim": "DIP",
                                                "args":
                                                    [{
                                                        "int":
                                                            "4"
                                                    },
                                                    [{
                                                        "prim":
                                                            "DUP"
                                                    }]]
                                            },
                                            {
                                                "prim": "DIG",
                                                "args":
                                                    [{
                                                        "int":
                                                            "4"
                                                    }]
                                            },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            { "prim": "CAR" },
                                            {
                                                "prim": "PUSH",
                                                "args":
                                                    [{
                                                        "prim":
                                                            "bool"
                                                    },
                                                    {
                                                        "prim":
                                                            "False"
                                                    }]
                                            }]]
                                    },
                                    { "prim": "UPDATE" },
                                    {
                                        "prim": "DIP",
                                        "args":
                                            [[{
                                                "prim": "DIP",
                                                "args":
                                                    [{
                                                        "int":
                                                            "4"
                                                    },
                                                    [{
                                                        "prim":
                                                            "DUP"
                                                    }]]
                                            },
                                            {
                                                "prim": "DIG",
                                                "args":
                                                    [{
                                                        "int":
                                                            "4"
                                                    }]
                                            },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CAR" },
                                            { "prim": "DUP" },
                                            { "prim": "CDR" },
                                            { "prim": "SWAP" },
                                            { "prim": "CAR" },
                                            { "prim": "CDR" }]]
                                    },
                                    { "prim": "PAIR" },
                                    { "prim": "PAIR" },
                                    { "prim": "PAIR" },
                                    {
                                        "prim": "DIP",
                                        "args":
                                            [{ "int": "5" },
                                            [{ "prim": "DROP" }]]
                                    },
                                    {
                                        "prim": "DUG",
                                        "args":
                                            [{ "int": "4" }]
                                    },
                                    {
                                        "prim": "DROP",
                                        "args":
                                            [{ "int": "2" }]
                                    },
                                    {
                                        "prim": "PUSH",
                                        "args":
                                            [{ "prim": "unit" },
                                            { "prim": "Unit" }]
                                    }]]
                            },
                            {
                                "prim": "DIP",
                                "args":
                                    [[{ "prim": "DROP" }]]
                            }]]
                    },
                    {
                        "prim": "DIP",
                        "args": [[{ "prim": "DROP" }]]
                    }],
                    [{ "prim": "DUP" },
                    {
                        "prim": "IF_LEFT",
                        "args":
                            [[{ "prim": "DUP" },
                            { "prim": "DUP" },
                            { "prim": "NOW" },
                            { "prim": "ADD" },
                            {
                                "prim": "DIP",
                                "args":
                                    [{ "int": "4" },
                                    [{ "prim": "DUP" }]]
                            },
                            {
                                "prim": "DIG",
                                "args": [{ "int": "4" }]
                            },
                            { "prim": "CAR" },
                            { "prim": "CAR" },
                            { "prim": "CDR" },
                            {
                                "prim": "DIP",
                                "args":
                                    [[{
                                        "prim": "DIP",
                                        "args":
                                            [{ "int": "5" },
                                            [{ "prim": "DUP" }]]
                                    },
                                    {
                                        "prim": "DIG",
                                        "args":
                                            [{ "int": "5" }]
                                    }]]
                            },
                            { "prim": "EXEC" },
                            { "prim": "DROP" },
                            { "prim": "DUP" },
                            {
                                "prim": "DIP",
                                "args":
                                    [[{
                                        "prim": "DIP",
                                        "args":
                                            [{ "int": "4" },
                                            [{ "prim": "DUP" }]]
                                    },
                                    {
                                        "prim": "DIG",
                                        "args":
                                            [{ "int": "4" }]
                                    },
                                    { "prim": "DUP" },
                                    { "prim": "CDR" },
                                    { "prim": "SWAP" },
                                    { "prim": "CAR" },
                                    { "prim": "DUP" },
                                    { "prim": "CDR" },
                                    { "prim": "SWAP" },
                                    { "prim": "CAR" },
                                    { "prim": "CAR" }]]
                            },
                            { "prim": "SWAP" },
                            { "prim": "PAIR" },
                            { "prim": "PAIR" },
                            { "prim": "PAIR" },
                            {
                                "prim": "DIP",
                                "args":
                                    [{ "int": "5" },
                                    [{ "prim": "DROP" }]]
                            },
                            {
                                "prim": "DUG",
                                "args": [{ "int": "4" }]
                            },
                            {
                                "prim": "DROP",
                                "args": [{ "int": "3" }]
                            },
                            {
                                "prim": "PUSH",
                                "args":
                                    [{ "prim": "unit" },
                                    { "prim": "Unit" }]
                            }],
                            [{ "prim": "DUP" },
                            {
                                "prim": "DIP",
                                "args":
                                    [{ "int": "3" },
                                    [{ "prim": "DUP" }]]
                            },
                            {
                                "prim": "DIG",
                                "args": [{ "int": "3" }]
                            },
                            { "prim": "CAR" },
                            { "prim": "CAR" },
                            { "prim": "CDR" },
                            { "prim": "NOW" },
                            { "prim": "COMPARE" },
                            { "prim": "GT" },
                            {
                                "prim": "IF",
                                "args":
                                    [[{
                                        "prim": "PUSH",
                                        "args":
                                            [{ "prim": "string" },
                                            {
                                                "string":
                                                    "The vote has ended."
                                            }]
                                    },
                                    { "prim": "FAILWITH" }],
                                    [{
                                        "prim": "PUSH",
                                        "args":
                                            [{ "prim": "unit" },
                                            { "prim": "Unit" }]
                                    }]]
                            },
                            { "prim": "DROP" },
                            {
                                "prim": "DIP",
                                "args":
                                    [{ "int": "3" },
                                    [{ "prim": "DUP" }]]
                            },
                            {
                                "prim": "DIG",
                                "args": [{ "int": "3" }]
                            },
                            { "prim": "CAR" },
                            { "prim": "CDR" },
                            { "prim": "CDR" },
                            { "prim": "SENDER" },
                            { "prim": "GET" },
                            {
                                "prim": "IF_NONE",
                                "args":
                                    [[{
                                        "prim": "PUSH",
                                        "args":
                                            [{ "prim": "string" },
                                            {
                                                "string":
                                                    "GET_FORCE"
                                            }]
                                    },
                                    { "prim": "FAILWITH" }],
                                    []]
                            },
                            {
                                "prim": "DIP",
                                "args":
                                    [[{ "prim": "DUP" }]]
                            },
                            { "prim": "SWAP" },
                            {
                                "prim": "DIP",
                                "args":
                                    [[{
                                        "prim": "DIP",
                                        "args":
                                            [[{ "prim": "DUP" }]]
                                    },
                                    { "prim": "SWAP" },
                                    {
                                        "prim": "DIP",
                                        "args":
                                            [[{
                                                "prim": "DIP",
                                                "args":
                                                    [{
                                                        "int":
                                                            "4"
                                                    },
                                                    [{
                                                        "prim":
                                                            "DUP"
                                                    }]]
                                            },
                                            {
                                                "prim": "DIG",
                                                "args":
                                                    [{
                                                        "int":
                                                            "4"
                                                    }]
                                            },
                                            { "prim": "CDR" }]]
                                    },
                                    { "prim": "GET" },
                                    {
                                        "prim": "IF_NONE",
                                        "args":
                                            [[{
                                                "prim": "PUSH",
                                                "args":
                                                    [{
                                                        "prim":
                                                            "string"
                                                    },
                                                    {
                                                        "string":
                                                            "GET_FORCE"
                                                    }]
                                            },
                                            {
                                                "prim":
                                                    "FAILWITH"
                                            }],
                                            []]
                                    },
                                    {
                                        "prim": "DIP",
                                        "args":
                                            [[{ "prim": "DUP" }]]
                                    },
                                    { "prim": "ADD" },
                                    { "prim": "SOME" },
                                    {
                                        "prim": "DIP",
                                        "args":
                                            [[{
                                                "prim": "DIP",
                                                "args":
                                                    [{
                                                        "int":
                                                            "4"
                                                    },
                                                    [{
                                                        "prim":
                                                            "DUP"
                                                    }]]
                                            },
                                            {
                                                "prim": "DIG",
                                                "args":
                                                    [{
                                                        "int":
                                                            "4"
                                                    }]
                                            },
                                            { "prim": "CDR" }]]
                                    }]]
                            },
                            { "prim": "UPDATE" },
                            {
                                "prim": "DIP",
                                "args":
                                    [[{
                                        "prim": "DIP",
                                        "args":
                                            [{ "int": "4" },
                                            [{ "prim": "DUP" }]]
                                    },
                                    {
                                        "prim": "DIG",
                                        "args":
                                            [{ "int": "4" }]
                                    },
                                    { "prim": "CAR" }]]
                            },
                            { "prim": "SWAP" },
                            { "prim": "PAIR" },
                            {
                                "prim": "DIP",
                                "args":
                                    [{ "int": "5" },
                                    [{ "prim": "DROP" }]]
                            },
                            {
                                "prim": "DUG",
                                "args": [{ "int": "4" }]
                            },
                            {
                                "prim": "DIP",
                                "args":
                                    [{ "int": "4" },
                                    [{ "prim": "DUP" }]]
                            },
                            {
                                "prim": "DIG",
                                "args": [{ "int": "4" }]
                            },
                            { "prim": "CAR" },
                            { "prim": "CDR" },
                            { "prim": "CDR" },
                            {
                                "prim": "NONE",
                                "args": [{ "prim": "nat" }]
                            },
                            { "prim": "SENDER" },
                            { "prim": "UPDATE" },
                            {
                                "prim": "DIP",
                                "args":
                                    [[{
                                        "prim": "DIP",
                                        "args":
                                            [{ "int": "4" },
                                            [{ "prim": "DUP" }]]
                                    },
                                    {
                                        "prim": "DIG",
                                        "args":
                                            [{ "int": "4" }]
                                    },
                                    { "prim": "DUP" },
                                    { "prim": "CDR" },
                                    { "prim": "SWAP" },
                                    { "prim": "CAR" },
                                    { "prim": "DUP" },
                                    { "prim": "CAR" },
                                    { "prim": "SWAP" },
                                    { "prim": "CDR" },
                                    { "prim": "CAR" }]]
                            },
                            { "prim": "SWAP" },
                            { "prim": "PAIR" },
                            { "prim": "SWAP" },
                            { "prim": "PAIR" },
                            { "prim": "PAIR" },
                            {
                                "prim": "DIP",
                                "args":
                                    [{ "int": "5" },
                                    [{ "prim": "DROP" }]]
                            },
                            {
                                "prim": "DUG",
                                "args": [{ "int": "4" }]
                            },
                            {
                                "prim": "DROP",
                                "args": [{ "int": "3" }]
                            },
                            {
                                "prim": "PUSH",
                                "args":
                                    [{ "prim": "unit" },
                                    { "prim": "Unit" }]
                            }]]
                    },
                    {
                        "prim": "DIP",
                        "args": [[{ "prim": "DROP" }]]
                    }]]
            },
            { "prim": "DROP" }, { "prim": "DUP" },
            {
                "prim": "NIL",
                "args": [{ "prim": "operation" }]
            },
            { "prim": "PAIR" },
            {
                "prim": "DIP",
                "args":
                    [[{
                        "prim": "DROP",
                        "args": [{ "int": "4" }]
                    }]]
            }]]
    }]

export const storage = (key: string, proposal: string) => ({
    "prim": "Pair",
    "args":
        [{
            "prim": "Pair",
            "args":
                [{
                    "prim": "Pair",
                    "args":
                        [[{
                            "string": key
                        }],
                        { "string": "2021-01-01T00:00:01Z" }]
                },
                {
                    "prim": "Pair",
                    "args": [{ "string": proposal }, [
                        { "prim": "Elt", args: [{ string: "tz1RvhdZ5pcjD19vCCK9PgZpnmErTba3dsBs" }, { int: "1" }] },
                        { "prim": "Elt", args: [{ string: "tz1b9kV41KV9N3sp69ycLdSoZ2Ak8jXwtNPv" }, { int: "1" }] },
                    ]]
                }]
        },
        [{
            "prim": "Elt",
            "args": [{ "int": "1" }, { "int": "0" }]
        },
        {
            "prim": "Elt",
            "args": [{ "int": "2" }, { "int": "0" }]
        },
        {
            "prim": "Elt",
            "args": [{ "int": "3" }, { "int": "0" }]
        }]]
})