// <?php

// namespace App\Http\Controllers\Auth;

// use App\Http\Controllers\Controller;
// use Illuminate\Auth\Events\PasswordReset;
// use Illuminate\Http\RedirectResponse;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Hash;
// use Illuminate\Support\Facades\Password;
// use Illuminate\Support\Str;
// use Illuminate\Validation\Rules;
// use Illuminate\Validation\ValidationException;
// use Inertia\Inertia;
// use Inertia\Response;

// class NewPasswordController extends Controller
// {
//     /**
//      * Display the password reset view.
//      */
//     public function create(Request $request): Response
//     {
//         return Inertia::render('Auth/ResetPassword', [
//             'email' => $request->email,
//             'token' => $request->route('token'),
//         ]);
//     }

//     /**
//      * Handle an incoming new password request.
//      *
//      * @throws \Illuminate\Validation\ValidationException
//      */
//     public function store(Request $request): RedirectResponse
//     {
//         $request->validate([
//             'token' => 'required',
//             'email' => 'required|email',
//             'password' => ['required', 'confirmed', Rules\Password::defaults()],
//         ]);

//         // Here we will attempt to reset the user's password. If it is successful we
//         // will update the password on an actual user model and persist it to the
//         // database. Otherwise we will parse the error and return the response.
//         $status = Password::reset(
//             $request->only('email', 'password', 'password_confirmation', 'token'),
//             function ($user) use ($request) {
//                 $user->forceFill([
//                     'password' => Hash::make($request->password),
//                     'remember_token' => Str::random(60),
//                 ])->save();

//                 event(new PasswordReset($user));
//             }
//         );

//         // If the password was successfully reset, we will redirect the user back to
//         // the application's home authenticated view. If there is an error we can
//         // redirect them back to where they came from with their error message.
//         if ($status == Password::PASSWORD_RESET) {
//             return redirect()->route('login')->with('status', __($status));
//         }

//         throw ValidationException::withMessages([
//             'email' => [trans($status)],
//         ]);
//     }
// }

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ValidationException, rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class NewPasswordController {
  public async create({ request, inertia }: HttpContextContract) {
    return inertia.render('Auth/ResetPassword', {
      email: request.input('email'),
      token: request.param('token'),
    })
  }

  public async store({ request, params, response }: HttpContextContract) {
    const { password } = await request.validate({
      schema: schema.create({
        password: schema.string({ trim: true }, [rules.confirmed()]),
      }),
    })
    if (!request.hasValidSignature()) {
      throw new ValidationException(true, {
        token: ['Invalid token'],
      })
    }
    const user = await User.findBy('email', params.email)
    user!.password = password
    await user!.save()
    return response.redirect().toRoute('login')
  }
}