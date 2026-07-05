export type StateTransition<TState extends Record<string, any>, TConstraint extends Record<string, any>> = {
    from: TState;
    to: TState;
    constraint: TConstraint;
};